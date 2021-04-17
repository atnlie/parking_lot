/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  17-April-2021
 */
class Car {
    constructor (PlateNumber, Color = "unknown") {
        this.PlateNumber = PlateNumber;
        this.Color = Color;
    }
}

module.exports = Car;