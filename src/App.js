import React, { Component } from 'react';

import DATA from './data.js'
import './App.css';


class App extends Component {
  render() {
    const routeRows = DATA.routes.map((route, idx) => (
      <tr key={idx}>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
      </tr>
    ))
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table className='routes-table'>
            <thead>
            <tr>
              <th>airline</th>
              <th>src</th>
              <th>dest</th>
            </tr>
            </thead>
            <tbody>
            { routeRows }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
