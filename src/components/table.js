import React, { Component } from 'react';

class Table extends Component {


  render () {
    const tableColumns = this.props.columns.map((column, idx) => {
      return <th key={idx}>{column.name}</th>
    })

    const rows = this.props.rows.map((data, idx) => (
      <tr key={idx}>
        {this.props.columns.map((column) => (
          <td key={column.property + idx}>{this.props.format(column.property, data[column.property])}</td>
        ))}
      </tr>
    ))
  return (
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
  )
}
}

export default Table;
