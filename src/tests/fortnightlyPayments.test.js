// test suite for forthnighly rent payments

import * as nextPayments from '../utility/nextPayments';
import * as datex from '../utility/datex';

describe('Testing fortnightly payments', function () {
    let Session;
    let rows, startDate, endDate, frequency, rent, paymentDay;

    // beforeEach(()  => {
        rows = [];   
        startDate = new Date('2018-08-09');
        let payment_day = 'tuesday';
        paymentDay = datex.getPaymentDay(payment_day);
        endDate = new Date('2018-12-28');
        frequency = 'fortnightly';
        rent = 510;
    // })

    test('Sample 2, fortnightly payments - has 11 rows', () => {
        nextPayments.nextRows (rows, startDate, endDate, frequency, 
            rent, paymentDay);
        console.log('rows = ', rows);
        expect(rows.length).toBe(11);
    })

    test('Sample 2, fortnightly payments - first row fromDate', () => {
        expect(rows[0].from).toBe('August, 9th 2018');
    })

    test('Sample 2, fortnightly payments - first row toDate', () => {
        expect(rows[0].to).toBe('August, 13th 2018');
    })

    test('Sample 2, fortnightly payments - first row amount', () => {
        expect(rows[0].amount).toBe('$364.3');
    })

    test('Sample 2, fortnightly payments - first row number of days', () => {
        expect(rows[0].days).toBe('5');
    })

    test('Sample 2, fortnightly payments - second row amount', () => {
        expect(rows[1].amount).toBe('$1020');
    })

    test('Sample 2, fortnightly payments - first row number of days', () => {
        expect(rows[1].days).toBe('14');
    })

    test('Sample 2, fortnightly payments - fifth row amount', () => {
        expect(rows[4].amount).toBe('$1020');
    })

    test('Sample 2, fortnightly payments - fifth row number of days', () => {
        expect(rows[4].days).toBe('14');
    })

    test('Sample 2, fortnightly payments - last row fromDate', () => {
        expect(rows[10].from).toBe('December, 18th 2018');
    })

    test('Sample 2, fortnightly payments - last row toDate', () => {
        expect(rows[10].to).toBe('December, 28th 2018');
    })

    test('Sample 2, fortnightly payments - last row amount', () => {
        expect(rows[10].amount).toBe('$801.4');
    })

    test('Sample 2, fortnightly payments - last row number of days', () => {
        expect(rows[10].days).toBe('11');
    })
})