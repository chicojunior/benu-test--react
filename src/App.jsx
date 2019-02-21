import React, { Component } from 'react';
import './App.css';
import MapContainer from "./components/MapContainer";


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: ''
    }
    this.getLocation = this.getLocation.bind(this)
  }

  getLocation(event) {
    this.setState({
      location: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <label>
            Location: <input type="text" onChange={this.getLocation} />
          </label>
        </div>
        <div>
          <MapContainer location={this.state.location} />
        </div>
      </div>
    );
  }
}

export default App;
