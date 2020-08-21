import React, { Component } from 'react';

class Table extends Component {
  state = {
    page: 0,
  }

  decrementPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  }

  incrementPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  }

  render () {
    const tableColumns = this.props.columns.map((column, idx) => {
      return <th key={idx}>{column.name}</th>
    })

    const start = this.state.page * this.props.perPage;
    const stop = start + this.props.perPage;

    const rows = this.props.rows.slice(start, stop).map((data, idx) => (
      <tr key={idx}>
        {this.props.columns.map((column) => (
          <td key={column.property + idx}>{this.props.format(column.property, data[column.property])}</td>
        ))}
      </tr>
    ))
  return (
    <div>
    <table className={this.props.className}>
      <thead>
        <tr>
          {tableColumns}
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
    <div className='pagination'>
      <p>Showing {`${start + 1}-${stop} of ${this.props.rows.length} routes.`}</p>
      <p>
        <button disabled={start - this.props.perPage < 0} onClick={this.decrementPage}>Previous Page</button>
        <button disabled={start + this.props.perPage >= this.props.rows.length} onClick={this.incrementPage}>Next Page</button>
      </p>
    </div>
    </div>
  )
}
}

export default Table;
