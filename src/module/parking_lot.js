/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  16-April-2021
 */

const Car = require('./car');

class ParkingSLot {
    constructor() {
        this.ParkingCapacity = new Array();
        this.MaxParkingSize = 0;
    }

    createParkingLot (input) {
        this.MaxParkingSize = parseInt(input.split(' ')[1]);

        if (this.MaxParkingSize <= 0 || isNaN(this.MaxParkingSize)) {
            throw new Error('Please set minimum 1 slot of capacity');
        }
        for (let i = 0; i < this.MaxParkingSize; i++) {
            this.ParkingCapacity.push(null);
        }
        return this.MaxParkingSize;
    }

    reserveParking (input) {
        const plateNumber = input.split(' ')[1];
        if (plateNumber === undefined) {
            throw new Error('Please input "Plate Number"');
        }

        if (this.MaxParkingSize > 0 ) {
            const checkSlot = this.findNearestEmptySlot();
            if (checkSlot.isAvailable) {
                const carColor = input.split(' ')[2];
                // car color is not mandatory because it's not defined in use case
                if (plateNumber) {
                    const carEntrance = new Car(plateNumber, carColor);
                    this.ParkingCapacity[checkSlot.slotNumber] = carEntrance;
                    return checkSlot.slotNumber;
                } else {
                    throw new Error('Please input "Plate Number');
                }
            } else {
                throw new Error('Sorry, parking lot is full');
            }
        } else {
            throw new Error('Parking lot is not set yet, please use [createParkingLot] command');
        }
    }

    checkParkingStatus () {
        const carParkingInfo = new Array();
        if (this.MaxParkingSize > 0) {
            carParkingInfo.push('Slot No. Registration No.')
            for (let i = 0; i < this.ParkingCapacity.length; i++) {
                if (this.ParkingCapacity[i] !== null) {
                    carParkingInfo.push((i+1) + '. ' + this.ParkingCapacity[i].PlateNumber);
                }
            }
            return carParkingInfo;
        } else {
            throw new Error('Parking lot is empty, please set minimum 1 slot of capacity');
        }
    }

    // search empty slot from nearest entry point
    findNearestEmptySlot () {
        for (let i = 0; i < this.ParkingCapacity.length; i++) {
            if (this.ParkingCapacity[i] === null) {
                return {
                    isAvailable: true,
                    slotNumber: i
                }
            }
        }
        return {
            isAvailable: false,
            slotNumber: -1
        };
    }

}

module.exports = ParkingSLot;