/*
The deriveRows function drives the derivation of payment intervals into rows 
based on the lease object passed in as argument. The detail work generating 
the rows is done in nextPayments.nextRows.  This structure 
facilitates different parameters to be set to test various scenarios 
for automated testing.
*/
    
    import * as datex from './datex';
    import * as nextPayments from './nextPayments';

    export function deriveRows(lease) {
      let rows = [];      
      // if (Object.keys(lease).length > 0) {
      if (Object.getOwnPropertyNames(lease).length > 0) {
        
        const {start_date, end_date, rent, frequency, payment_day} = lease;
    
        // let rowId = 0;
        
        let startDate = new Date(start_date);
        let startDay = startDate.getDay();
        let paymentDay = datex.getPaymentDay(payment_day);
        let endDate = new Date(end_date);
       
        logLeaseInfo(lease, startDay, paymentDay);

        nextPayments.nextRows(rows, startDate, endDate, frequency, rent, paymentDay);
        
      }
      
      return rows;
      
    }
   

    /* The logLeaseInfo function logs the parameters derived from the lease object.
    */
    function logLeaseInfo(lease, startDay, paymentDay) {
      const {start_date, end_date, rent, frequency, payment_day} = lease;
      console.log('start_date = ', start_date);
      console.log ('startDay = ', startDay);
      console.log ('payment_day = ', payment_day);
      console.log('paymentDay: ', paymentDay);
      console.log('end_date = ', end_date);
      console.log('frequency = ', frequency);
      console.log('rent = ', rent);
    }
