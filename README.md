# parking_lot App
I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is given a number starting at 1 increasing with increasing distance from the entry point in steps of one. I want to create an automated ticketing system that allows my customers to use my parking lot without human intervention. 

When a car enters my parking lot, I want to have a ticket issued to the driver. The ticket issuing process includes us documenting the registration number (number plate) and the colour of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver (we assume that our customers are nice enough to always park in the slots allocated to them). The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket with the time the car was parked in the lot, which then marks the slot they were using as being available. Total parking charge should be calculated as per the parking time. Charge applicable is $10 for first 2 hours and $10 for every additional hour.

###Commands:
- Create parking lot of size n : `create_parking_lot {capacity}`
- Park a car : `park {car_number}`
- Remove(Unpark) car from : `leave {car_number} {hours}`
- Print status of parking slot : `status`
- Delete parking lot to 0: `delete_parking_lot`

###Execute using binary file
- To install all dependencies, compile and run tests: `bin/setup`
- To run the code input from a file: `bin/parking_lot src/data/input.txt`

###Execute using node
- To install all dependencies, compile and run tests: `npm run start` or `node src/index.js`
- To run the code input from a file: `node src/index.js src/data/input.txt`

###Execute Unit Test and Coverage
- To run test unit test cases: `npm run test`
- To run test coverage unit test cases: `npm run test:coverage`
