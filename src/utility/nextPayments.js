/* The collection of functions here is to do the detailed work for the
generation of the rows for each payment interval.

*/

import * as datex from './datex';

/* The nextRows function is handles the generation of every row associated 
with a lease.  It pushes the derived rows into a rows array that is passed 
in from the calling function which also provides all the required parameters:

startDate: date object - start date of lease
endDate: date object - end date of lease
frequency - weekly | fortnightly | monthly
rent - weekly rent (number)
paymentDay - the day of the week as a number (0 for sunday, 1 for monday...) 
                on which the paymentDate falls

*/

export function nextRows (rows, startDate, endDate, frequency, rent, paymentDay) {
   
    let startDay = startDate.getDay();
    let d1 = startDate.getTime();
    let d2 = endDate.getTime();
    let nsDate = new Date(d1);
    let toDate, numDays, toDateAndDays, fromDateStr, toDateStr, amount;
    let rentalRecord;
    let rowId = 0;
   
    while (d1 < d2) {

        if (rowId === 0) {
            let firstPaymentDates = datex.firstPaymentDates (startDate, startDay, 
                paymentDay, frequency, endDate);
            numDays = firstPaymentDates.numDays; 
            toDate = firstPaymentDates.toDate; 
           
        } else {
            toDateAndDays = datex.getToDateAndDays(nsDate, frequency, endDate); 
            toDate = toDateAndDays.toDate;
            numDays = toDateAndDays.numDays;
        }
       
        fromDateStr = datex.getFormattedDateStr(nsDate);
        toDateStr = datex.getFormattedDateStr(toDate);
        amount = calcAmount(numDays, frequency, rent);
        rentalRecord = formatRentalRecord(rowId, fromDateStr, toDateStr, numDays, amount);       
        // addRow(rows, rowId, rentalRecord);
        rows.push(rentalRecord);
        rowId++;
        nsDate = datex.addDays(toDate, 1);
        d1 = nsDate.getTime();
    }

}

/* This function returns an object for a lease payment interval 
with the fields properly formatted.
This object would later be pushed into the rows array */
export function formatRentalRecord(rowId, fromDateStr, toDateStr, numDays, amount) {
    return {
        rowId: rowId,
        from: fromDateStr,
        to: toDateStr,
        days: numDays.toString(),
        amount: '$' + amount.toString()
    };
}

/* This function calculates the amount payable for each payment interval (row)
of the lease */
export function calcAmount(numDays, freq, rent) {
    var amount = 0;

    if (freq === 'weekly') {
        if (numDays === 7) {
            return rent;
        } 
        amount = numDays * rent/7.0;
        return amount.toFixed(1);
        
    } else if (freq === 'fortnightly') {
        if (numDays === 14) {
            return rent * 2;
        } 
        amount = numDays * rent/7.0;
        return amount.toFixed(1);

    } else if (freq === 'monthly') {
        if (numDays === 28) {
            return rent * 4;
        } 
        amount = numDays * rent/7.0;
        return amount.toFixed(1);
        
    } else {
        console.log('Invalid frequency');
        throw new Error('Invalid frequency');
    }
}
