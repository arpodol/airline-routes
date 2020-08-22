import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';
import Table from './components/table.js'
import Select from './components/select.js'


class App extends Component {
  state = {
    selectedAirline: 'all',
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

  routeMatchesSelectedAirline(route){
    return route.airline.toString() === this.state.selectedAirline || this.state.selectedAirline === 'all';
  }


  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredAirlines = DATA.airlines;

    const filteredRoutes = DATA.routes.filter(route => this.routeMatchesSelectedAirline(route));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Select options={filteredAirlines} valueKey="id" titleKey="name"
              allTitle="All Airlines" value="" onSelect={this.onAirlineSelect} />
            <Table className="routes-table" columns={columns} rows={filteredRoutes} format={this.formatValue} perPage={25} />
        </section>
      </div>
    );
  }
}

export default App;
