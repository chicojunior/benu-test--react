import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({ uri: 'https://dev-api.benu.at/graphql' })

const API_KEY = 'AIzaSyCHhAP0kyhv-Y80JlaKypgjiBKrOZmvFnc'

const mapStyles = {
  width: '100%',
  height: '82%'
}

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      geolocations: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      client
        .query({
          query: gql`
            {
              findLocation(key: "${this.props.location}") {
                city
                province
                zipCode
                available
              }
            }
          `
        })
        .then(result => {
          this.setState({
            locations: result.data.findLocation
          })
          this.geocodeLocations(this.state.locations)
        })
        .catch(error => console.error(error))
    }
  }

  geocodeLocations(locations) {
    let geolocations = []
    locations.map(location => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.city}&key=${API_KEY}`)
      .then(response => {
        if (!response.ok) throw response
        return response.json()
      })
      .catch(err => {
        err.json().then(errorMessage => {
          this.setState({
            error: errorMessage
          })
        })
      })
      .then(json => {
        json.results.map(res => {
          const place = {
            name: res.formatted_address,
            location: res.geometry.location
          } 
          geolocations.push(place)
          this.setState({ geolocations: geolocations })
        })
      })
    })
  }

  render() {
    const geoLocs = this.state.geolocations
    return (
      <Map
        google={this.props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={{lat: 47.5162, lng: 14.5501 }}
      >
        {geoLocs.map((marker, i) => (
          <Marker 
            key={i} 
            title={marker.name} 
            position={marker.location} 
          />
        ))}
      </Map>
    )
  }
}

export default GoogleApiWrapper({ apiKey: API_KEY })(MapContainer);