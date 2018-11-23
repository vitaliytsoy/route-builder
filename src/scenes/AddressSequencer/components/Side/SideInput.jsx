import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SideInput extends Component {
  static propTypes = {
    google: PropTypes.object,
    addNewAddress: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',    
    }
    this.searchInput = React.createRef();
  }
  
  componentDidMount = () => {
    const { google, addNewAddress } = this.props;
    const searchInput = this.searchInput.current;
    searchInput.focus();
    if (google) {
      const searchBox = new google.maps.places.Autocomplete(searchInput);
      searchBox.setFields(['formatted_address', 'geometry']);
      searchBox.addListener('place_changed', () => {
        let place = searchBox.getPlace();
        if (place.name) {
          place.name = place.name.trim();
        }
        this.setState({searchInputValue: ''});
        addNewAddress(place);
      });
    }
  }
  
  handleSeachInput = (event) => {
    this.setState({searchInputValue: event.target.value});
  }

  render() {
    return (
      <div className="control">
        <label htmlFor="address-search">Address Search</label>
        <input
          type="text"
          className="input"
          id="address-search"
          placeholder="Type in name or location"
          ref={this.searchInput}
          value={this.state.searchInputValue}
          onChange={this.handleSeachInput}
        />
      </div>
    );
  }
}
