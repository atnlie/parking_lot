/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  18-April-2021
 */

// remove unused spaces
const removeSpacesWrapper = (input) => {
    if (input === undefined) {
        return input;
    }
    return input.replace(/^\s+|\s+$/g,'');
};

/**
 * calculate parking fee base on scenarios
 * 1-2 hours -> fee 10$
 * more than 3 hours -> 10$ every additional hours
 */
const parkingFeeCalculation = (hours) => {
    if (hours <= 0 || isNaN(hours)) {
        return 0;
    } else {
        if (hours < 3) {
            return 10;
        } else {
            return (hours - 2) * 10 + 10;
        }
    }
}

// find car by plate number whether plates already registered or not
const searchCarInSlot = (carParkingDataArray, plateNumber) => {
    return carParkingDataArray.find(element => element !== null &&
        element.PlateNumber === plateNumber);
}

module.exports = { removeSpacesWrapper, parkingFeeCalculation, searchCarInSlot };