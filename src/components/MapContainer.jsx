import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: 'https://dev-api.benu.at/graphql'
})

const mapStyles = {
  width: '100%',
  height: '100%'
}

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: []
    }
  }

  componentDidUpdate() {
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
      .then(data => {
        this.setState({
          locations: data
        })
        console.log(this.state.locations)
      })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={7}
        style={mapStyles}
        initialCenter={{
          lat: 47.5162,
          lng: 14.5501
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHhAP0kyhv-Y80JlaKypgjiBKrOZmvFnc'
})(MapContainer);