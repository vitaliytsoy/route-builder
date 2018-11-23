import React, {Component} from 'react';
import GoogleMaps from 'google-maps';
import GoogleMapsConfig from './googlemap.config';
import uuidv1 from 'uuid/v1';

import './AddressSequencer.scss';
import Map from "./components/Map/Map";
import Side from "./components/Side/Side";

class AddressSequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRender: false,
      addressesList: [],
      mapClass: null,
    }
    this.mapInstance = null;
  }
  componentDidMount = () => {
    const {KEY, LANGUAGE, VERSION, LIBRARIES} = GoogleMapsConfig;
    GoogleMaps.KEY = KEY;
    GoogleMaps.LANGUAGE = LANGUAGE;
    GoogleMaps.LIBRARIES = LIBRARIES;
    GoogleMaps.VERSION = VERSION;
    GoogleMaps.load((google) => {
      this.setState({mapClass: google, readyToRender: true});
    });
  }
  
  addAddress = (newAddress) => {
    newAddress.id = `${uuidv1()}`;
    if (!newAddress.geometry) {
      newAddress.formatted_address = newAddress.name;
      newAddress.geometry = {location: this.mapInstance.getCenter()};
    }
    this.setState({ addressesList: [...this.state.addressesList, newAddress] });
  }
  deleteAddress = (addressId) => {
    const newAddressesList = this.state.addressesList.filter( (item, index) => index !== addressId);
    this.setState({ addressesList: newAddressesList});
  }
  updateAddressPosition = (addressId, newPosition) => {
    const { addressesList } = this.state;
    const updatedAddressesList = addressesList.map((item) => {
      if (item.id === addressId) {
        item.geometry.location = newPosition;
      }
      return item;
    });
    this.setState({addressesList: updatedAddressesList});
  }
  changeAddressOrder = (oldIndex, newIndex ) => {
    const reorderedAdressesList = this.moveInnerArrayItem(this.state.addressesList, oldIndex, newIndex);
    this.setState({addressesList: reorderedAdressesList});
  }
  moveInnerArrayItem = (arr, oldIndex, newIndex) => {
    let copyArray = Object.assign([], arr);
    while (oldIndex < 0) {
        oldIndex += copyArray.length;
    }
    while (newIndex < 0) {
        newIndex += copyArray.length;
    }
    if (newIndex >= copyArray.length) {
        let k = newIndex - copyArray.length;
        while ((k--) + 1) {
            copyArray.push(undefined);
        }
    }
     copyArray.splice(newIndex, 0, copyArray.splice(oldIndex, 1)[0]);  
   return copyArray;
  }
  getMapInstance = (mapInstance) => {
    this.mapInstance = mapInstance;
  }

  render() {
    const { readyToRender, mapClass, addressesList } = this.state;
    console.log(addressesList);
    console.log(addressesList.geometry);

    return (
      <section className="sequencer">
      { readyToRender && 
      (
        <div className="container container-flex-row">
          <div className="sequencer--side">
            <Side google={mapClass} 
                  addressesList={addressesList} 
                  addNewAddress={this.addAddress}
                  deleteAddress={this.deleteAddress}
                  changeAddrOrder={this.changeAddressOrder}
                  />
          </div>
          <div className="sequencer--map">
            <Map google={mapClass}
                addressesList={addressesList}
                passMapInstanceToParent={this.getMapInstance}
                updateAddressPosition={this.updateAddressPosition}
                />
          </div>
        </div>
      ) 
      }
      </section>
    );
  }
}


export default AddressSequencer;
