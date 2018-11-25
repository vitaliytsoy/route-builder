import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Side.scss';

import SideInput from './SideInput';
import SideList from './SideList';

class Side extends Component {
  static propTypes = {
    google: PropTypes.object,
    addressesList: PropTypes.array.isRequired,
    addNewAddress: PropTypes.func,
    deleteAddress: PropTypes.func,
    changeAddrOrder: PropTypes.func,
  };
  static defaultProps = {
    addressesList: []
  };
  
  render() {
    const { addressesList, changeAddrOrder, deleteAddress, addNewAddress, google } = this.props;
    return (
      <div className="side">
        <div className="side--input">
          <SideInput google={google} addNewAddress={addNewAddress} />
        </div>
        {
          addressesList.length !== 0 &&
          <div className="side--list">
            <SideList items={addressesList} changeAddrOrder={changeAddrOrder} deleteAddress={deleteAddress}/>
          </div>
        }
      </div>
    );
  }
}
export default Side;
