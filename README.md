Overview of application:

This application provides an online report of the past and upcoming rental 
payments for a leaseID with a given start-date and end-date.

The report calculates the intervals for rent payment based on the frequency 
of payments (weekly, fortnightly, or monthly) and payment day (day of the week)
specified in the lease.  

The first payment interval would be from the start date of the lease and the toDate for the interval would be one day before the payment day.  Subsequent intervals would be computed based on the frequency and the payment day. The final payment would cover all remaining days which maybe less than or equal to the number of days for the specified frequency, till the end-date.

The payment amount is calculated based on the weekly rent specified in the 
lease and the number of days for each computed interval.


Dependencies:
The application uses the leaseID input by the user to fetch the relevant lease
details from a server using the following url:

'https://hiring-task-api.herokuapp.com/v1/leases/:id'

The lease details provided by the server are as follows:

The API always responds in JSON format which contains the following data:

Name        Type                            Description
id          string                          Lease id
start_date  string                          Start of the lease
end_date    string                          End of the lease
rent        number                          Weekly rent amount
frequency   weekly | fortnightly | monthly  Payment frequency
payment_day monday | tuesday | wednesday |  Payment day in the week
                    thursday | friday


Below is an example output:
{
“id”: 123,
“start_date”: “2018-07-12”,
“end_date”: “2018-11-17”,
“rent”: 545,
“frequency”: “weekly”,
“payment_day”: “wednesday”
}

Unhappy paths:
Error handling is in place for the following:
1) Ensure that leaseId is filled in - this is enforced by making it a required field.
2) In the event the leaseID fails to find a match in the server, 
an error will be output on the page.
3) In the event, the url to fetch lease details from the server fails, an error will be output on the page.


Testing:

Automated unit testing has been included under the src/tests folder.
Three scenarios have been setup in 3 separate files to test weekly, fortnightly 
and monthly payments.

Security
In a real application, we might want to constrain users from keying in any leaseId
and browsing through information that is not pertaining to their current lease.
One way might be to require that users also key in the start-date for a leaseId entered
and the application can fetch the lease details using the url provided and validate the start-date fetched against what the user has entered,  If it doesn't match, then do not 
show the rental paymemt list.  This will discourage users from trying to browse the database and look at other lease details.

Alternatively, we can validate against a list of leaseIds if stored in the user's profile.


Architecture:
The application uses React and create-react-app to simplify the setup.  The React components are all located in the components folder.  All the componenets for this App have names starting with Rental.  

Supporting functions are placed in the utility folder.  They include the functions for date manipulation and functions for deriving the rows for all the payment intervals associated with a lease. 

The application state is centrally kept in the RentalMain component which drives the top level display including a form for the input of leaseID, error messages and the high level display control for the rent payment table.  The RentalPayments component handles the display for the table header and the high level display for the table body for rental payments.  The RentalRow component handles the display for an individual row of rental payment interval.

The application uses a leaseId input by the user to retrieve the lease details from a server using the dynamic url provided with the leaseID as part of the url.
The lease details is return in a JSON format.  No credentials are required.

How to run:  

Please follow the instrauction provided below for running the application in development mode and test mode.  For production deployment, this new feature would need to be integrated with the existing lease management app, further tested and build for production.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
