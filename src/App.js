import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';


class App extends Component {
  render() {
    const routeRows = DATA.routes.map((route, idx) => (
      <tr key={idx}>
        <td>{DATA.getAirlineById(route.airline).name}</td>
        <td>{DATA.getAirportByCode(route.src).name}</td>
        <td>{DATA.getAirportByCode(route.dest).name}</td>
      </tr>
    ))
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <div>
            <table className='routes-table'>
              <thead>
                <tr>
                  <th>Airline</th>
                  <th>Source Airport</th>
                  <th>Destination Airport</th>
                </tr>
              </thead>
              <tbody>
                { routeRows }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
