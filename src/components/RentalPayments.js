/* The RentalPayments component handles the display of the header information
for the table as well as the rental payment intervals in the table body
It gets an array of rows containing the details of the rental payment intervals
associated with the lease by calling the deriveRows utility.
It uses the RentalRow child component to handle the output for each row. */

import React, { Component } from 'react';
import RentalRow from './RentalRow';
import * as rowsx from '../utility/deriveRows';
import PropTypes from 'prop-types';

class RentalPayments extends Component {

    render() {
      var rows = rowsx.deriveRows(this.props.lease);
      var rentalRows = rows.map(rentalRecord => {
        return (<RentalRow 
        rental={rentalRecord}
        key={rentalRecord.rowId}
        />)
      })
      return (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Amount</th>
            </tr>
          </thead>
          {rows.length > 0 ?<tbody>{rentalRows}</tbody> :
          <tbody></tbody>}
        </table>
      );
    
    }
}

RentalRow.propTypes  = {
  lease: PropTypes.object
}


export default RentalPayments;

