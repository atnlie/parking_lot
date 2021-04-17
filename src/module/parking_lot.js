/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  16-April-2021
 */

class ParkingSLot {
    constructor() {
        this.ParkingCapacity = new Array();
        this.MaxParkingSize = 0;
    }

    create_parking_lot (input) {
        this.MaxParkingSize = parseInt(input.split(' ')[1]);

        if (this.MaxParkingSize <= 0 || isNaN(this.MaxParkingSize)) {
            throw new Error('Please set minimum 1 slot of capacity');
        }
        for (let i = 0; i < this.MaxParkingSize; i++) {
            this.ParkingCapacity.push(null);
        }
        return this.MaxParkingSize;
    }
}

module.exports = ParkingSLot;