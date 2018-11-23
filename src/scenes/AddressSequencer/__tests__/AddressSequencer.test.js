import React from "react";
import AddressSequencer from "../AddressSequencer";
import { shallow, mount } from "enzyme";
import { fakeAdderessesList } from "./_fakeData";

it("renders without crashing", () => {
  const wrapper = shallow(<AddressSequencer />);
});

it("should have specific initial state", () => {
  const wrapper = shallow(<AddressSequencer />);
  expect(wrapper.state().readyToRender).toEqual(false);
  expect(wrapper.state().addressesList).toEqual([]);
});

it("should add new address to the list", () => {
  const wrapper = shallow(<AddressSequencer />);
  const instance = wrapper.instance();
  instance.mapInstance = {};
  instance.mapInstance.getCenter = () => {
    return {
      lat: () => 55.4235,
      lng: () => 34.5234
    };
  };

  expect(wrapper.state().addressesList.length).toEqual(0);
  instance.addAddress({ name: "This is New Address" });
  expect(wrapper.state().addressesList.length).toEqual(1);
});

it("should delete specific address from the list", () => {
  const wrapper = shallow(<AddressSequencer />);
  const instance = wrapper.instance();

  wrapper.setState({ addressesList: fakeAdderessesList });

  expect(wrapper.state().addressesList.length).toEqual(
    fakeAdderessesList.length
  );
  instance.deleteAddress(2);
  expect(wrapper.state().addressesList.length).toEqual(
    fakeAdderessesList.length - 1
  );
});

it("should update specific address LatLng", () => {
  const wrapper = shallow(<AddressSequencer />);
  const instance = wrapper.instance();

  const savedOldFakeAdresses = Object.assign([], fakeAdderessesList);
  const fakeAddressId = "4ae974c0-eec2-11e8-b8ce-9b18e7fd4a36";
  const newFakeLatLng = {
    lat: () => 67.4235,
    lng: () => 34.5234
  };
  const oldFakeAddress = savedOldFakeAdresses.find(oldFakeItem => {
    return oldFakeItem.id === fakeAddressId;
  });
  const oldFakeLatLng = Object.assign({}, oldFakeAddress.geometry.location);

  wrapper.setState({ addressesList: fakeAdderessesList });

  instance.updateAddressPosition(fakeAddressId, newFakeLatLng);
  const updatedFakeAddressObject = wrapper
    .state()
    .addressesList.find(newFakeAddress => newFakeAddress.id === fakeAddressId);
  expect(updatedFakeAddressObject.geometry.location.lat()).not.toEqual(
    oldFakeLatLng.lat()
  );
  expect(updatedFakeAddressObject.geometry.location.lng()).not.toEqual(
    oldFakeLatLng.lng()
  );
});

it("should return new array with moved inner item to specified position", () => {
  const wrapper = shallow(<AddressSequencer />);
  const instance = wrapper.instance();

  const beforeArray = [0, 1, 2, 3, 4, 5];
  const moveFromIndex = 4;
  const moveToIndex = 2;
  expect(
    instance.moveInnerArrayItem(beforeArray, moveFromIndex, moveToIndex)
  ).toEqual([0, 1, 4, 2, 3, 5]);
});
