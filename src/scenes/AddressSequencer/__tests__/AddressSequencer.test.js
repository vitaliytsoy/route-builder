import React from 'react';
import AddressSequencer from '../AddressSequencer';
import { shallow, mount } from 'enzyme';


it('renders without crashing', () => {
    const wrapper = shallow(<AddressSequencer />);
});

it('check initial state', () => {
    const wrapper = shallow(<AddressSequencer />);
    const initialState = {
        readyToRender: false,
        addressesList: [],
        mapClass: null,
    }
    expect(wrapper.state()).toEqual(initialState);
});
