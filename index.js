const optionalMasker = require("./lib/optionalMasker");
const plateMask = "99 AAAA 9999";
const spaceRegex = /\s/g;
const plateRegex = /^(?:[1-9][0-9]?|0?[1-9]) [A-Z]{1,4} [0-9]{1,4}$/;

module.exports = exports = LicencePlate;

function LicencePlate(value) {
    if (!(this instanceof LicencePlate)) {
        return new LicencePlate(value);
    }
    var plateValue = optionalMasker.toPattern(value, plateMask).toUpperCase();
    plateValue = plateRegex.test(plateValue) ? plateValue : "";

    Object.defineProperties(this, {
        value: {
            enumerable: false,
            configurable: false,
            get: () => plateValue
        }
    });
}
LicencePlate.prototype.valueOf = function() { return this.value; };
LicencePlate.prototype.toString = function() { return this.value; };
LicencePlate.prototype.toJSON = function() { return this.value; };
LicencePlate.prototype.toDatabaseFormat = function() { return this.value.replace(spaceRegex, "").toLowerCase(); };
