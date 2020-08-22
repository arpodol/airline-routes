import React, { Component } from 'react';

class Select extends Component {

  render() {
    return (
      <p>
      <select onChange={this.props.onSelect}>
        <option value='all'>{this.props.allTitle}</option>
        {this.props.options.map(airline => (
          <option key={airline[this.props.valueKey]}value={airline[this.props.valueKey]}>{airline[this.props.titleKey]}</option>
        ))
        }
      </select>
      </p>
    )
  }
}

export default Select;
