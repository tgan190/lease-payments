/* The RentalRow component outputs each row of rental payment interval details
to the page.  A rental props is expected */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RentalRow extends Component {
    render() {
      const rental = this.props.rental;
      const {from, to, days, amount } = rental;
  
      return (
        
        <tr>
          <td>{from}</td>
          <td>{to}</td>
          <td className="right">{days}</td>
          <td>{amount}</td>
        </tr>
       
      );
    }
}

RentalRow.propTypes  = {
  rental: PropTypes.object
}

export default RentalRow
  