import React from 'react';
import { mount, shallow } from 'enzyme';
import Side from '../components/Side/Side';
import { addressesList } from './_fakeData';

it('renders without crashing', () => {
    shallow(<Side addressesList={[]} />);
});

it('should be provided with "addressesList" prop', () => {
    const wrapper = mount(<Side addressesList={[]} />);
    expect(wrapper.prop('addressesList')).toBeDefined();
});