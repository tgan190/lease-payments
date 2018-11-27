//test suite for monthly rent payment

import * as nextPayments from '../utility/nextPayments';
import * as datex from '../utility/datex';

describe('Testing monthly payments', function () {
    let Session;
    let rows, startDate, endDate, frequency, rent, paymentDay;

    // beforeEach(()  => {
        rows = [];   
        startDate = new Date('2018-02-15');
        let payment_day = 'friday';
        paymentDay = datex.getPaymentDay(payment_day);
        endDate = new Date('2018-07-15');
        frequency = 'monthly';
        rent = 820;
    // })

    test('Sample 3, monthly payments - has 11 rows', () => {
        nextPayments.nextRows (rows, startDate, endDate, frequency, 
            rent, paymentDay);
        console.log('rows = ', rows);
        expect(rows.length).toBe(7);
    })

    test('Sample 3, monthly payments - first row amount', () => { 
        expect(rows[0].amount).toBe('$117.1');
    })

    test('Sample 3, monthly payments - first row fromDate', () => {
        expect(rows[0].from).toBe('February, 15th 2018');
    })

    test('Sample 3, monthly payments - first row toDate', () => {
        expect(rows[0].to).toBe('February, 15th 2018');
    })

    test('Sample 3, monthly payments - first row number of days', () => {
        expect(rows[0].days).toBe('1');
    })

    test('Sample 3, monthly payments - second row amount', () => {
        expect(rows[1].amount).toBe('$3280');
    })

    test('Sample 3, monthly payments - first row number of days', () => {
        expect(rows[1].days).toBe('28');
    })

    test('Sample 3, monthly payments - fifth row amount', () => {
        expect(rows[4].amount).toBe('$3280');
    })

    test('Sample 3, monthly payments - fifth row number of days', () => {
        expect(rows[4].days).toBe('28');
    })

    test('Sample 3, monthly payments - last row fromDate', () => {
        expect(rows[6].from).toBe('July, 6th 2018');
    })

    test('Sample 3, monthly payments - last row toDate', () => {
        expect(rows[6].to).toBe('July, 15th 2018');
    })

    test('Sample 3, monthly payments - last row amount', () => {
        expect(rows[6].amount).toBe('$1171.4');
    })

    test('Sample 3, monthly payments - last row number of days', () => {
        expect(rows[6].days).toBe('10');
    })
})