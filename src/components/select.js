import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
class Select extends Component {


  render() {

    return (
      <select onChange={this.props.onSelect}>
        <option value='all'>{this.props.allTitle}</option>
        {this.props.allOptions.map(option => (
          <option disabled={!this.props.filteredOptions.some(filteredOption => isEqual(option,filteredOption))}key={option[this.props.valueKey]}value={option[this.props.valueKey]}>{option[this.props.titleKey]}</option>
        ))
        }
      </select>
    )
  }
}

export default Select;
