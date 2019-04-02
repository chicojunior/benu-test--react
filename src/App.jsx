import React, { Component } from 'react';
import './App.css';
import MapContainer from "./components/MapContainer";


class App extends Component {
  state = { location: '' }

  setLocation = (event) => {
    this.setState({ location: event.target.value })
  }

  render() {
    return (
      <div className="app">
        <input 
          className="app__search-input" 
          type="text" 
          onChange={this.setLocation} 
          placeholder="Location"
        />
        <div className="app__map-container">
        <MapContainer location={this.state.location} />
        </div>
      </div>
    );
  }
}

export default App;
