import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';
import Table from './components/table.js'
import Select from './components/select.js'
import Map from './components/map.js'

class App extends Component {
  state = {
    selectedAirline: 'all',
    selectedAirport: 'all'
  }

  formatValue(property, value) {
    if(property === 'airline'){
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  onAirlineSelect = (e) => (
    this.setState({
      selectedAirline: e.target.value,
    })
  )

  onAirportSelect = (e) => (
    this.setState({
      selectedAirport: e.target.value,
    })
  )

  onClearClick = () => {
    this.setState({
      selectedAirline: 'all',
      selectedAirport: 'all',
    })
  }

  routeMatchesSelectedAirline(route){
    return route.airline.toString() === this.state.selectedAirline || this.state.selectedAirline === 'all';
  }

  routeMatchesSelectedAirport(route){
    return route.src === this.state.selectedAirport || route.dest === this.state.selectedAirport || this.state.selectedAirport === 'all';
  }

  retrieveRouteLatLong(route){
    const sourceAirport = DATA.getAirportByCode(route.src);
    const destinationAirport = DATA.getAirportByCode(route.dest);
    return {
      airline: route.airline,
      source: route.src,
      sourceLong: sourceAirport.long,
      sourceLat: sourceAirport.lat,
      destination: route.dest,
      destinationLong: destinationAirport.long,
      destinationLat: destinationAirport.lat,
    }
  }


  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = DATA.routes.filter(route => this.routeMatchesSelectedAirline(route) && this.routeMatchesSelectedAirport(route));

    const filteredAirlines = DATA.airlines.filter(airline => filteredRoutes.some(route => route.airline === airline.id));

    const filteredAirports = DATA.airports.filter(airport => filteredRoutes.some(route => route.src === airport.code || route.dest === airport.code));

    const filteredRoutesCoordinates = filteredRoutes.map(route => this.retrieveRouteLatLong(route));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map
            routes={filteredRoutesCoordinates}
            ></Map>
          <p>
            Show Routes on
          <Select allOptions={DATA.airlines} filteredOptions={filteredAirlines} valueKey="id" titleKey="name"
              allTitle="All Airlines" value="" onSelect={this.onAirlineSelect} />
            flying in or out of
          <Select allOptions={DATA.airports} filteredOptions={filteredAirports} valueKey="code" titleKey="name"
              allTitle="All Airports" value="" onSelect={this.onAirportSelect} />
            <button disabled={this.state.selectedAirline === 'all' && this.state.selectedAirport === 'all'}onClick={this.onClearClick}>Show All Routes</button>
          </p>
            <Table className="routes-table" columns={columns} rows={filteredRoutes} format={this.formatValue} perPage={25} />
        </section>
      </div>
    );
  }
}

export default App;
