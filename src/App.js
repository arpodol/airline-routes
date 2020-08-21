import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';
import Table from './components/table.js'


class App extends Component {

  formatValue(property, value) {
    if(property === 'airline'){
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <div>
            <Table className="routes-table" columns={columns} rows={DATA.routes} format={this.formatValue} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
