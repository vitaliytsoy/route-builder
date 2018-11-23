import React from 'react';
import { mount } from 'enzyme';
import SideList from '../components/Side/SideList';
import { fakeAdderessesList } from './_fakeData';

it('renders without crashing', () => {
    mount(<SideList items={fakeAdderessesList}/>);
});

it('should be provided with "items" prop', () => {
    const wrapper = mount(<SideList items={fakeAdderessesList}/>);
    expect(wrapper.prop('items')).toBeDefined();
});

it(`should display right amount of list items(${fakeAdderessesList.length}`, () => {
    const wrapper = mount(<SideList items={fakeAdderessesList}/>);
    expect(wrapper.find('li').length).toBe(fakeAdderessesList.length);
});
