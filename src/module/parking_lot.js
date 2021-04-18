/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  16-April-2021
 */

const Car = require('./car');
const utils = require('../helper/utils');

class ParkingSLot {
    constructor() {
        this.ParkingCapacity = new Array();
        this.MaxParkingSize = 0;
    }

    // init slot parking
    createParkingLot(input) {
        const ParkingSize = parseInt(input.split(' ')[1]);

        if (ParkingSize <= 0 || isNaN(this.MaxParkingSize)) {
            throw new Error('Please set minimum 1 slot of capacity');
        }
        this.MaxParkingSize = ParkingSize;
        for (let i = 0; i < this.MaxParkingSize; i++) {
            this.ParkingCapacity.push(null);
        }
        return this.MaxParkingSize;
    }

    deleteParkingLot() {
        this.MaxParkingSize = 0;
        this.ParkingCapacity = []; // delete all existing data
        return true;
    }

    //new car entrance for parking
    reserveParking(input) {
        const plateNumber = input.split(' ')[1];
        if (plateNumber === undefined) {
            throw new Error('Please input "Plate Number"');
        }

        const isPlateNumberExist = utils.searchCarInSlot(this.ParkingCapacity, plateNumber);
        if (isPlateNumberExist !== undefined) {
            throw new Error(`${plateNumber} is already exist in parking area, try another car.`);
        }

        if (this.MaxParkingSize > 0) {
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
            throw new Error('Parking lot is empty, please set minimum 1 slot of capacity');
        }
    }

    // check status
    checkParkingStatus() {
        const carParkingInfo = new Array();
        if (this.MaxParkingSize > 0) {
            carParkingInfo.push('Slot No. Registration No.');
            for (let i = 0; i < this.ParkingCapacity.length; i++) {
                if (this.ParkingCapacity[i] !== null) {
                    carParkingInfo.push((i + 1) + '. ' + this.ParkingCapacity[i].PlateNumber);
                }
            }
            return carParkingInfo;
        } else {
            throw new Error('Parking lot is empty, please set minimum 1 slot of capacity');
        }
    }

    // search empty slot from nearest entry point
    findNearestEmptySlot() {
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

    carLeaveParking(input) {
        if (this.MaxParkingSize > 0) {
            const plateNumber = input.split(' ')[1];
            const totHours = parseInt(input.split(' ')[2]);

            if (plateNumber && totHours) {
                const parkingFee = utils.parkingFeeCalculation(totHours);

                for (let i = 0; i < this.MaxParkingSize; i++) {
                    if (this.ParkingCapacity[i] === null) {
                        continue;
                    }

                    if (this.ParkingCapacity[i].PlateNumber.toLowerCase() === plateNumber.toLowerCase()) {
                        this.ParkingCapacity[i] = null;

                        const lastPlateNumber = plateNumber.split('-').pop();
                        const carParkingFee = {
                            plateNumber,
                            totalHours: totHours,
                            fee: parkingFee,
                            slotNumber: i + 1,
                            lastPlateNumber
                        };
                        return carParkingFee;
                    }

                }
            } else {
                throw new Error(`"Plate Number" and "Total Hours" should be input`);
            }
        } else {
            throw new Error('Parking lot is empty, please set minimum 1 slot of capacity');
        }
    }
}

module.exports = ParkingSLot;