const assert = require('chai').assert;

const utils = require('./utils');

describe('Testing utils functionality', () => {
    it('Remove unused spaces at prefix and suffix', () => {
        let command = 'create_parking_lot';
        let result = utils.removeSpacesWrapper(command);
        assert.equal(result, 'create_parking_lot');

        command = 'create_parking_lot ';
        result = utils.removeSpacesWrapper(command);
        assert.equal(result, 'create_parking_lot');

        command = ' create_parking_lot';
        result = utils.removeSpacesWrapper(command);
        assert.equal(result, 'create_parking_lot');

        command = ' create_parking_lot ';
        result = utils.removeSpacesWrapper(command);
        assert.equal(result, 'create_parking_lot');

        command = undefined;
        result = utils.removeSpacesWrapper(command);
        assert.equal(result, undefined);
    })

    it('Parking Fee Calculation', () => {
        // 1 hour
        let fee = utils.parkingFeeCalculation(1)
        assert.equal(fee, 10);
        // 2 hours
        fee = utils.parkingFeeCalculation(2)
        assert.equal(fee, 10);
        // 3 hours
        fee = utils.parkingFeeCalculation(3)
        assert.equal(fee, 20);
        // 5 hours
        fee = utils.parkingFeeCalculation(5)
        assert.equal(fee, 40);

        fee = utils.parkingFeeCalculation(0)
        assert.equal(fee, 0);
    });

    it('searchCarInSlot is available', () => {
        const carParkingDataArray = [{
            plateNumber: 'KA-01-HH-1234'
        },{
            plateNumber: 'KA-01-HH-9999'
        }];

        let plateNumber = 'KA-01-HH-1234';
        let carExist = utils.searchCarInSlot(carParkingDataArray, plateNumber);
        assert.exists(carExist, plateNumber);

        plateNumber = 'KA-01-HH-1234X';
        try {
            carExist = utils.searchCarInSlot(carParkingDataArray, plateNumber);
        } catch (err) {
            assert.exists(err.message, undefined);
        }
    });
});