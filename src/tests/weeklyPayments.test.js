// test suite for weekly rent payments

import * as nextPayments from '../utility/nextPayments';
import * as datex from '../utility/datex';

describe('Testing weekly payments', function () {
   
    let rows, startDate, endDate, frequency, rent, paymentDay;

    // beforeEach(()  => {
        rows = []; 
        startDate = new Date('2018-05-12');
        let payment_day = 'tuesday';
        paymentDay = datex.getPaymentDay(payment_day);
        endDate = new Date('2018-11-13');
        frequency = 'weekly';
        rent = 454;
    // })

    test('Sample 1, weekly payment - has 28 rows', () => {
        nextPayments.nextRows (rows, startDate, endDate, frequency, 
            rent, paymentDay);
        console.log('rows = ', rows);
        expect(rows.length).toBe(28);
    })

    test('Sample 1, weekly payments - first row fromDate', () => {
        expect(rows[0].from).toBe('May, 12th 2018');
    })

    test('Sample 1, weekly payments - first row toDate', () => {
        expect(rows[0].to).toBe('May, 14th 2018');
    })

    test('Sample 1, weekly payment - first row amount', () => {
        expect(rows[0].amount).toBe('$194.6');
    })

    test('Sample 1, weekly payment - first row number of days', () => {
        expect(rows[0].days).toBe('3');
    })

    test('Sample 1, weekly payment - second row amount', () => {
        expect(rows[1].amount).toBe('$454');
    })

    test('Sample 1, weekly payment - second row number of days', () => {
        expect(rows[1].days).toBe('7');
    })

    test('Sample 1, weekly payment - fifth row amount', () => {
        expect(rows[4].amount).toBe('$454');
    })

    test('Sample 1, weekly payment - fifth row number of days', () => {
        expect(rows[4].days).toBe('7');
    })

    test('Sample 1, weekly payments - last row fromDate', () => {
        expect(rows[27].from).toBe('November, 13th 2018');
    })

    test('Sample 1, weekly payments - last row toDate', () => {
        expect(rows[27].to).toBe('November, 13th 2018');
    })

    test('Sample 1, weekly payment - last row amount', () => {
        expect(rows[27].amount).toBe('$64.9');
    })

    test('Sample 1, weekly payment - last row number of days', () => {
        expect(rows[27].days).toBe('1');
    })
})