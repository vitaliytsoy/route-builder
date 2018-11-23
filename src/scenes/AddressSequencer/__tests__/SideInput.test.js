import React from 'react';
import { mount } from 'enzyme';
import SideInput from '../components/Side/SideInput';

it('renders without crashing', () => {
    mount(<SideInput />);
});

it('updates an input when user type', () => {
    const wrapper = mount(<SideInput />);
    wrapper.find('input').simulate('change', {target: {name: 'address-search', value: 'Moscow'}});
    expect(wrapper.state().searchInputValue).toBe('Moscow');
});

