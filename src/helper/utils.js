/**
 * @author : Anton - Heni Kurniyanto
 * @copyright :  18-April-2021
 */

const removeSpacesWrapper = (input) => {
    if (input !== undefined) {
        return input;
    }
    return input.replace(/^\s+|\s+$/g,'');
};

module.exports = { removeSpacesWrapper };