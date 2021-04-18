/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  16-April-2021
 */
const fs = require('fs');
const readLine = require('readline');
const ParkingSLot = require('./module/parking_lot');
const utils = require('./helper/utils');

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

        let arrayCli = data.split('\n');
        for (let i = 0; i < arrayCli.length; i++) {
            executeUserCommands(arrayCli[i]);
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
const parkingSlot = new ParkingSLot();

// menu commands
const executeUserCommands = (input) => {
    const userInputCommand = input.split(' ')[0];
    const userCommand = utils.removeSpacesWrapper(userInputCommand);  // remove unused spaces in front and end command

    switch (userCommand) {
        case 'create_parking_lot':
            try {
                const totalSlot = parkingSlot.createParkingLot(input);
                console.log(`Created parking lot with ${totalSlot} slots`);
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'delete_parking_lot':
            try {
                if (parkingSlot.deleteParkingLot()) {
                    console.log(`Parking lot set 0 slots`);
                } else {
                    console.log(`Parking lot can't to delete.`);
                }
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'park':
            try {
                const slotNumber = parkingSlot.reserveParking(input);
                console.log(`Allocated slot number: ${slotNumber + 1}`);
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'leave':
            try {
                const parkingFee = parkingSlot.carLeaveParking(input);
                if (parkingFee) {
                    console.log(`Registration number ` +
                        `${parkingFee.plateNumber.replace(`-${parkingFee.lastPlateNumber}`, '')} \n` +
                        `${parkingFee.lastPlateNumber} with Slot Number ${parkingFee.slotNumber} ` +
                        `is free with Charge $${parkingFee.fee}`);
                } else {
                    console.log('Car not found in parking area.');
                }
            }
            catch (err) {
                console.log(err.message);
            }

            break;
        case 'status':
            try {
                const carParkingInfo = parkingSlot.checkParkingStatus();
                if (carParkingInfo.length > 1) {
                    console.log(carParkingInfo.join('\n'));
                } else {
                    console.log('No cars found in parking area.');
                }
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
            if (isCli) {
                console.log('Hello there, please use [create_parking_lot, park, leave, status, delete_parking_lot] instead');
            }
            break;
    }
    commandModes();
}