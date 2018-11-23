import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  static propTypes = {
    google: PropTypes.object,
    addressesList: PropTypes.array,
    passMapInstanceToParent: PropTypes.func,
    updateAddressPosition: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      mapInstance: null,
    }
    this.markers = [];
    this.markersIds = [];
    this.routeCoordinates = [];
    this.routePath = null;
  }
  componentDidMount = () => {
    const { google } = this.props;
    const map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 4, 
      center: {lat: 55.7558, lng: 37.6173},
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });
    this.routePath = new google.maps.Polyline({
      path: this.routeCoordinates,
      // geodesic: true,
      // editable: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });
    this.props.passMapInstanceToParent(map);
    this.setState({mapInstance: map});
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { google, updateAddressPosition } = this.props
    const { mapInstance } = this.state;

    const oldAddressesList = prevProps.addressesList;
    const newAddressesList = this.props.addressesList;
    let marker;
    
    // Executes when we no address was ADDED/REMOVE to/from List
    // Basically it is change of order of adresses in the List
    if (newAddressesList.length === oldAddressesList.length) {
      console.log("NO MARKERS TO ADD OR DELETE");
    } 
    // Executes when new address has been added to the List 
    if (newAddressesList.length > oldAddressesList.length) {
      for (let i = 0; i < newAddressesList.length; i++) {
        if (!this.markersIds.includes(newAddressesList[i]['id'])) {
          // Set up marker
          const latlng = newAddressesList[i]['geometry']['location'];
          const id = newAddressesList[i]['id']
          marker = new google.maps.Marker({
            position: latlng,
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: mapInstance,
            id: id,
          });
          // Set up info bubble on marker
          const infowindow = new google.maps.InfoWindow();
          const content = newAddressesList[i]['formatted_address'];
          google.maps.event.addListener(marker,'click', ((marker, content, infowindow) => {
            return function() {
                infowindow.setContent(content);
                infowindow.open(mapInstance, marker);
            };
          })(marker, content, infowindow));
          // Set up drag handler on marker 
          google.maps.event.addListener(marker, 'drag', ((marker) => {
            return (event) => {
              updateAddressPosition(marker.id, event.latLng);
            }
          })(marker));
          // Add marker and markerId to list to further use
          this.markers.push(marker);
          this.markersIds.push(newAddressesList[i]['id']);
        }
      }
    }
    // Executes when address has been removed from the List
    if (newAddressesList.length < oldAddressesList.length) {
      // Finding out what IDs of markers to DELETE
      let markersToDelete = Object.assign([], this.markersIds);
      for (let i = 0; i < newAddressesList.length; i++) {
        const existingMarkerID = newAddressesList[i]['id'];
        markersToDelete = markersToDelete.filter((markerID) => existingMarkerID !== markerID);
      }
      // REMOVING markers from map and lists
      markersToDelete.forEach((markerIdToDelete) => {
        this.markersIds = this.markersIds.filter((item) => item !== markerIdToDelete);
        const positionOfMarker = this.markers.findIndex((item) => item.id === markerIdToDelete);
        if (positionOfMarker !== -1) {
          this.markers[positionOfMarker].setMap(null);
          this.markers.splice(positionOfMarker, 1);
        }
      });
    }
    // Route drawing 
    this.routeCoordinates = [];
    newAddressesList.forEach((item) => {
      this.routeCoordinates.push(item.geometry.location);
    });
    this.routePath.setPath(this.routeCoordinates);
  }
  
  render() {
    return (
        <div className="map"></div>
    );
  }
}

export default Map;
