import React, { Component } from 'react';
import './App.scss';
import AddressSequencer from "./scenes/AddressSequencer/AddressSequencer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddressSequencer/>
      </div>
    );
  }
}

export default App;
