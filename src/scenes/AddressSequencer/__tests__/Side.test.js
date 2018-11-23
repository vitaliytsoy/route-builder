import React from 'react';
import { shallow } from 'enzyme';
import Side from '../components/Side/Side';

it('renders without crashing with addressList prop provided', () => {
    shallow(<Side addressesList={[]} />);
});
it('renders without crashing without addressList prop provided', () => {
    shallow(<Side />);
});