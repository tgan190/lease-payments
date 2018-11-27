/*  
For information on this application, please see the README.md included with
the project.
*/

/* The RentalMain component controls the state information for the leaseID 
input as well as the leaseInfo fetched from the server.  It also tracks and 
controls the display of error messages.  Once the leaseInfo is obtained from 
the server via a url, it uses this info to drive the computation and display of 
the rental payment intervals using the RentalPayments child component.
 */

import React, { Component } from 'react';
import './Rental.css';
import RentalPayments from './RentalPayments';

class RentalMain extends Component {

  constructor (props) {
    super(props);
    this.state = { 
      leaseId: '',
      leaseInfo: {},
      error: ''
    }

    // url = 'https://hiring-task-api.herokuapp.com/v1/leases/:id';
    this.baseUrl = 'https://hiring-task-api.herokuapp.com/v1/leases/';
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  onChange (event) {
    const target = event.target;
    const name = target.name;
    this.setState({
        [name]: target.value,
        error: ''
    });
   //  this.setState({leaseId: event.target.value, error: ''})
  }

  
  // this method retrieves leaseInfo from a server using a dynamic url
  // it then stores the leaseInfo in the state

  handleSubmit(event) {
    let error = '';
    event.preventDefault();

    if (this.state.leaseId) {
      var url = this.baseUrl + this.state.leaseId;
      fetch(url).then(response => response.json())
      .then(data => {
        // console.log(data);
        if (Object.getOwnPropertyNames(data).length > 0) { 
          this.setState({leaseInfo: data, error: error});
        } else {
          error = "LeaseID not found";
          this.setState({leaseInfo: {}, error: error});
        }
      })
      .catch(error => {
        this.setState({error: "error accessing server"});
        console.log(error);

      })
    } else {
      error = "LeaseID is required";
      this.setState({error: error});
    }
    
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-input">
          <form onSubmit={this.handleSubmit}>
            <label className="leaseId" htmlFor="leaseId">
              lease id:   
            </label>
            <input name="leaseId" 
              value={this.state.leaseId} 
              onChange={this.onChange}
              placeholder = "leaseId" 
              required
              />
          
            <input type="submit" value="Submit" />
          </form>          
        </header>
        {this.state.error && (<div className="error">{this.state.error}</div>)}
        <RentalPayments lease={this.state.leaseInfo} />
      </div>
    );
  }
}

export default RentalMain;
