import React from 'react';
import AddressSequencer from '../AddressSequencer';
import { shallow, mount } from 'enzyme';


it('renders without crashing', () => {
    const wrapper = shallow(<AddressSequencer />);
});

it('should have specific initial state', () => {
    const wrapper = shallow(<AddressSequencer />);
    expect(wrapper.state().readyToRender).toEqual(false);
    expect(wrapper.state().addressesList).toEqual([]);
});



