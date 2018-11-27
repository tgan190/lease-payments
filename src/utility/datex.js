/*
The collection of functions here is to facilitate the manipulation of dates
*/


/* This function returns a number corresponding to the day of the week
0 - sunday, 1 - monday, ... 6 - saturday */
export function getPaymentDay (payment_date) {
    return ["sunday","monday","tuesday","wednesday","thursday",
    "friday","saturday"].indexOf(payment_date.toLowerCase());
}

/* Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    // date.setDate(date.getDate() + days);
    date.setDate(date.getDate() + days);
    return date;
} */

/* This function returns a new date object with the date set to a 
given Date + a certain number of days */
export function addDays(givenDate, days) {
    var date = new Date(givenDate.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

/* This function enables us to display the day of the month as 1st instead of 1, 
2nd instead 2, 3rd instead of 3, 4th instead of 4.
The argument n is the day of the month
*/
function getOrdinal(n) {
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
 }


 /* This function computes the toDate and the number of days in the 
 first payment interval.

 startDate - a Date object for the start date
 startDay - the day of the week as a number (0 for sunday, 1 for monday...) 
            on which the startDate falls
 paymentDay - the day of the week as a number (0 for sunday, 1 for monday...) 
                on which the paymentDate falls
 frequency - weekly | fortnightly | monthly
 endDate - a Date object for the end date

 */
export function firstPaymentDates (startDate, startDay, paymentDay, frequency, endDate) {
    var toDate, toDateAndDays, numDays;

    if (paymentDay > startDay) {
        numDays = paymentDay - startDay;
        toDate = addDays(startDate,(numDays - 1));
           
    } else if (startDay > paymentDay){
        numDays = 7 - (startDay - paymentDay);
        toDate = addDays(startDate,(numDays - 1));
       
    } else {
        // if paymentDay is the same as the startDay (both falling on the same day of the week)

        /* getToDateAndDays returns an object with 2 properties - toDate and 
        the number of days*/
        toDateAndDays = getToDateAndDays(startDate, frequency, endDate);
        toDate = toDateAndDays.toDate;
        numDays = toDateAndDays.numDays;
    }

    return {
        toDate: toDate,
        numDays: numDays
    }
}

/* This function returns a formatted date string such as April, 13th 2018 */
export function getFormattedDateStr(inDate) {
    var locale = "en-us",
    inMonth = inDate.toLocaleString(locale, {
        month: "long"
    });
    var n = inDate.getDate();
    var DateStr = inMonth + ", " + getOrdinal(n) + " " + 
    inDate.getFullYear();
    return DateStr;
}

    
/* This function computes and returns the toDate and number of days for 
payment intervals after the first (the exception is 
when the start date and the payment Day both fall on the same day of the week, 
then this function would be used as well to compute the first payment interval */
export function getToDateAndDays(fromDate, frequency, endDate) {
    var numDays;
   
    if (frequency === 'weekly') {
        numDays = 7;
    } else if (frequency === 'fortnightly') {
        numDays = 14;
    } else if (frequency === 'monthly') {
        numDays = 28;
    }
 
    var toDate = addDays(fromDate,(numDays - 1));
    if(toDate.getTime() <= endDate.getTime()) {
        return {toDate: toDate, numDays: numDays} ;
    } else {
        toDate = new Date(endDate.getTime());
        numDays = datediff(fromDate, toDate) + 1;
        return {toDate: toDate, numDays: numDays};
    }
   
}


function datediff(first, second) {
    // returns the difference in days between two date objects
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}
        


