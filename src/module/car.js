/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  17-April-2021
 */
class Car {
    constructor (PlateNumber, Color = "-") {
        this.PlateNumber = PlateNumber;
        this.Color = Color; // not be used for operation because not mandatory
    }
}

module.exports = Car;