import React from 'react';
import { shallow } from 'enzyme';
import Map from '../components/Map/Map';

it('renders without crashing with addressList prop provided', () => {
    shallow(<Map />);
});