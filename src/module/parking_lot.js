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

    // init slot parking
    createParkingLot(input) {
        this.MaxParkingSize = parseInt(input.split(' ')[1]);

        if (this.MaxParkingSize <= 0 || isNaN(this.MaxParkingSize)) {
            throw new Error('Please set minimum 1 slot of capacity');
        }
        for (let i = 0; i < this.MaxParkingSize; i++) {
            this.ParkingCapacity.push(null);
        }
        return this.MaxParkingSize;
    }

    //new car entrance for parking
    reserveParking(input) {
        const plateNumber = input.split(' ')[1];
        if (plateNumber === undefined) {
            throw new Error('Please input "Plate Number"');
        }

        // TODO: handle duplicate plate number

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
                const parkingFee = this.parkingFeeCalculation(totHours);

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

    parkingFeeCalculation(hours) {
        if (hours <= 0 || isNaN(hours)) {
            return 0;
        } else {
            // 1-2 hours -> fee 10$
            // more than 3 hours -> 10$ every additional hours
            if (hours < 3) {
                return 10;
            } else {
                const totFee = (hours - 2) * 10 + 10;
                return totFee;
            }
        }
    }
}

module.exports = ParkingSLot;