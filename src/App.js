import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';
import Table from './components/table.js'
import Select from './components/select.js'


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


  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];


    const filteredAirlines = DATA.airlines;

    const filteredAirports = DATA.airports;

    const filteredRoutes = DATA.routes.filter(route => this.routeMatchesSelectedAirline(route) && this.routeMatchesSelectedAirport(route));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show Routes on
          <Select options={filteredAirlines} valueKey="id" titleKey="name"
              allTitle="All Airlines" value="" onSelect={this.onAirlineSelect} />
            flying in or out of
          <Select options={filteredAirports} valueKey="code" titleKey="name"
              allTitle="All Airports" value="" onSelect={this.onAirportSelect} />
            <button onClick={this.onClearClick}>Show All Routes</button>
          </p>
            <Table className="routes-table" columns={columns} rows={filteredRoutes} format={this.formatValue} perPage={25} />
        </section>
      </div>
    );
  }
}

export default App;
