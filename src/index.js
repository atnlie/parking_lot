/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  16-April-2021
 */
const fs = require('fs');
const readLine = require('readline');

const ParkingSLot = require('./module/parking_lot');

const prompts = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let	cliInput = process.argv;
let isCli = false;

// check input based on file or cli
if (cliInput[cliInput.length - 1].endsWith('.txt')) {
    isCli = false;
    fs.readFile(cliInput[2], 'utf-8', (err, data) => {
        if (err) {
            console.log('Error reading file');
        }

        let arr = data.split('\n');
        for (let i = 0; i < arr.length; i++) {
            executeUserCommands(arr[i]);
        }

        process.exit(1);
    });
}
else {
    isCli = true;
    commandModes();
}

function commandModes() {
    if (isCli) {
        prompts.question('Input: ', (data) => {
            executeUserCommands(data);
        });
    }
}

// init class
const parkingSLot = new ParkingSLot();

// menu commands
const executeUserCommands = (input) => {
    let userCommand = input.split(' ')[0];

    switch (userCommand) {
        case 'create_parking_lot':
            try {
                const totalSlot = parkingSLot.create_parking_lot(input)
                console.log(`Created parking lot with ${totalSlot} slots`);
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'park':
            try {
                console.log('Halo park !');
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'leave':
            try {
                console.log('Halo leave !');
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'status':
            try {
                console.log('Halo status !');
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'exit':
            console.log('Thank you see you again!');
            process.exit(0);
            break;
        default:
            console.log('Hello there, please use [create_parking_lot, park, leave, status] instead');
            break;
    }
    commandModes();
}