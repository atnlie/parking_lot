const assert = require('chai').assert;
const fs = require('fs');

const ParkingLot = require('./parking_lot');

describe('Unit Testing CLI in ParkingLot class', () => {
    let commands = 'create_parking_lot 3';
    const parkingLot = new ParkingLot();

    it('Create parking slot commands', (done) => {
        assert.equal(commands.split(' ')[0], 'create_parking_lot');
        assert.equal(commands.split(' ')[1], '3');
        done();
    });

    it('Test "create_parking_lot" commands', (done) => {
        const totalSlot = parkingLot.createParkingLot(commands);
        assert.equal(totalSlot, 3);
        done();
    });

    it('Test "create_parking_lot" with 0 slot commands', (done) => {
        commands = 'create_parking_lot 0';
        try {
            const _ = parkingLot.createParkingLot(commands);
        } catch (err) {
            assert.equal(err.message, 'Please set minimum 1 slot of capacity');
        }
        done();
    });

    it('Test "park" commands to Allocating Parking 1', (done) => {
        commands = 'park KA-01-HH-1234';
        const slotAvailable = parkingLot.reserveParking(commands);
        assert.equal(slotAvailable, 0, 'Car will use nearest slot.');
        done();
    });

    it('Test "park" commands to Allocating Parking 2', (done) => {
        commands = 'park KA-01-HH-9999';
        const slotAvailable = parkingLot.reserveParking(commands);
        assert.equal(slotAvailable, 1, 'Car will use nearest slot.');
        done();
    });

    it('Test "park" commands to Allocating Parking 3', (done) => {
        commands = 'park KA-01-BB-0001';
        const slotAvailable = parkingLot.reserveParking(commands);
        assert.equal(slotAvailable, 2, 'Car will use nearest slot.');
        done();
    });

    it('Test "leave" commands to remove car from parking slot', (done) => {
        commands = 'leave KA-01-BB-0001 4';
        const parkingFee = parkingLot.carLeaveParking(commands);

        const carParkingFee = {
            plateNumber: 'KA-01-BB-0001',
            totalHours: 4,
            fee: 30,
            slotNumber: 3,
            lastPlateNumber: '0001'
        };

        assert.equal(parkingFee.fee, carParkingFee.fee);
        assert.equal(parkingFee.plateNumber, carParkingFee.plateNumber);
        assert.equal(parkingFee.totalHours, carParkingFee.totalHours);
        assert.equal(parkingFee.lastPlateNumber, carParkingFee.lastPlateNumber);
        assert.equal(parkingFee.slotNumber, carParkingFee.slotNumber);
        done();
    });

    it('Test "status" commands', (done) => {
        commands = 'status';
        const carParkingInfo = parkingLot.checkParkingStatus(commands);

        const result = ['Slot No. Registration No.',
            '1. KA-01-HH-1234',
            '2. KA-01-HH-9999'];

        assert.equal(carParkingInfo[0], result[0]);
        assert.equal(carParkingInfo[2], '2. KA-01-HH-9999');
        assert.equal(carParkingInfo.length, 3);
        done();
    });

    it('Test "park" commands to Allocating Parking 3', (done) => {
        commands = 'park KA-01-BB-0001';
        const slotAvailable = parkingLot.reserveParking(commands);
        assert.equal(slotAvailable, 2, 'Car will use nearest slot.');
        done();
    });

    it('Test "park" commands using invalid plateNumber', (done) => {
        commands = 'park';
        try {
            const _ = parkingLot.reserveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'Please input "Plate Number"');
        }
        done();
    });

    it('Test "park" commands using invalid plateNumber', (done) => {
        commands = 'park invalidPlateNumber';
        try {
            const _ = parkingLot.reserveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'Sorry, parking lot is full');
        }
        done();
    });

    it('Test "delete_parking_lot" commands', (done) => {
        commands = 'delete_parking_lot';
        const deleteParkingCapacity = parkingLot.deleteParkingLot(commands);
        assert.equal(deleteParkingCapacity, true);

        done();
    });

    it('Test "status" commands', (done) => {
        commands = 'status';
        try {
            const _ = parkingLot.checkParkingStatus(commands);
        } catch (err) {
            assert.equal(err.message, 'Parking lot is empty, please set minimum 1 slot of capacity');
        }

        done();
    });

    it('Test "park" commands to in situation parking lot not set yet', (done) => {
        commands = 'park KA-01-BB-0001';
        try {
            const _ = parkingLot.reserveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'Parking lot is empty, please set minimum 1 slot of capacity');
        }
        done();
    });

    it('Test "park" commands to Allocating Parking', (done) => {
        commands = 'park KA-01-BB-0001';
        try {
            const _ = parkingLot.reserveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'Parking lot is empty, please set minimum 1 slot of capacity');
        }
        done();
    });

    it('Leave parking without plat number and hours params and position after empty slot', (done) => {
        //create parking slot
        commands = 'create_parking_lot 3';
        parkingLot.createParkingLot(commands);
        // register car
        commands = 'park KA-01-HH-1234';
        parkingLot.reserveParking(commands);
        commands = 'park KA-01-HH-1235';
        parkingLot.reserveParking(commands);
        commands = 'park KA-01-HH-1236';
        parkingLot.reserveParking(commands);


        // leave parking
        commands = 'leave KA-01-HH-1235 4';
        parkingLot.carLeaveParking(commands);

        commands = 'park KA-01-HH-1236 3';
        parkingLot.carLeaveParking(commands);

        commands = 'leave';
        try {
            parkingLot.carLeaveParking(commands);
        } catch (err) {
            assert.equal(err.message,'"Plate Number" and "Total Hours" should be input');
        }
        done();
    });

    it('Leave parking but parking lot not set yet', (done) => {
        // delete parking slot
        parkingLot.deleteParkingLot();
        commands = 'leave KA-01-HH-1235 4';
        try {
            parkingLot.carLeaveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'Parking lot is empty, please set minimum 1 slot of capacity');
        }

        done();
    });

    describe('TEST', () => {
    const parkingLot2 = new ParkingLot();
    it('Reserve Parking without plate number', (done) => {
        parkingLot2.deleteParkingLot();
        commands = 'create_parking_lot 2';
        parkingLot2.createParkingLot(commands);
        commands = 'park KA-01-HH-1235';
        parkingLot2.reserveParking(commands);
        try {
            parkingLot2.reserveParking(commands);
        } catch (err) {
            assert.equal(err.message, 'KA-01-HH-1235 is already exist in parking area, try another car.')
        }
        done();
    });
});


});

describe('Unit Testing command from txt file in ParkingLot class', () => {
    it('reading input.txt', (done) => {
        fs.readFile('./src/data/input.txt', 'utf-8', (err, data) => {
            if (err) {
                throw 'Unable to read input test file';
            }
            commands = JSON.parse(JSON.stringify(data)).split('\n');
            done();
        });
    });

    it('checking commands', (done) => {
        assert.equal(commands[0].split(' ')[0], 'create_parking_lot');
        assert.equal(commands[1].split(' ')[0], 'park');
        assert.equal(commands[7].split(' ')[0], 'leave');
        assert.equal(commands[8], 'status');
        assert.equal(commands[9].split(' ')[0], 'park');
        assert.equal(commands[11].split(' ')[0], 'leave');
        assert.equal(commands[17], 'status');
        done();
    });

    describe('Unit Testing command execution', () => {
        const parkingLot = new ParkingLot();

        it('Creating a Parking slot', (done) => {
            const totalSlot = parkingLot.createParkingLot(commands[0]);
            assert.equal(totalSlot, 6);
            done();
        });

        it('Allocation Parking slot 1', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[1]);
            assert.equal(slotAvailable, 0);
            done();
        });

        it('Allocation Parking slot 2', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[2]);
            assert.equal(slotAvailable, 1);
            done();
        });

        it('Allocation Parking slot 3', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[3]);
            assert.equal(slotAvailable, 2);
            done();
        });

        it('Allocation Parking slot 4', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[4]);
            assert.equal(slotAvailable, 3);
            done();
        });

        it('Allocation Parking slot 5', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[5]);
            assert.equal(slotAvailable, 4);
            done();
        });

        it('Allocation Parking slot 6', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[6]);
            assert.equal(slotAvailable, 5);
            done();
        });

        it('Allocation Parking slot is full', (done) => {
            try {
                parkingLot.reserveParking(commands[6]);
            } catch (err) {
                assert.equal(err.message, 'KA-01-HH-3141 is already exist in parking area, try another car.');
            }
            done();
        });

        it('Leave Parking slot 4', (done) => {
            const parkingFee = parkingLot.carLeaveParking(commands[7]);
            const carParkingFee = {
                plateNumber: 'KA-01-HH-3141',
                totalHours: 4,
                fee: 30,
                slotNumber: 6,
                lastPlateNumber: '3141'
            };

            assert.equal(parkingFee.fee, carParkingFee.fee);
            assert.equal(parkingFee.plateNumber, carParkingFee.plateNumber);
            assert.equal(parkingFee.totalHours, carParkingFee.totalHours);
            assert.equal(parkingFee.lastPlateNumber, carParkingFee.lastPlateNumber);
            assert.equal(parkingFee.slotNumber, carParkingFee.slotNumber);

            done();
        });

        it('Test "status" commands', (done) => {
            const carParkingInfo = parkingLot.checkParkingStatus(commands[8]);
            const result = ['Slot No. Registration No.',
                '1. KA-01-HH-1234',
                '2. KA-01-HH-9999',
                '3. KA-01-BB-0001',
                '4. KA-01-HH-7777',
                '5. KA-01-HH-2701'];

            assert.equal(carParkingInfo[0], result[0]);
            assert.equal(carParkingInfo[2], '2. KA-01-HH-9999');
            assert.equal(carParkingInfo.length, 6);
            done();
        });

        it('Allocation Parking slot nearest (slot 4)', (done) => {
            const slotAvailable = parkingLot.reserveParking(commands[10]);
            assert.equal(slotAvailable, 5);
            done();
        });

        it('Allocation Parking slot nearest but full', (done) => {
            try {
                parkingLot.reserveParking(commands[9]);
            } catch (err) {
                assert.equal(err.message, 'Sorry, parking lot is full');
            }
            done();
        });
    });
});
