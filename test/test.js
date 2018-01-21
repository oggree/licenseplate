const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
const LicencePlate = require("..");
const availableLetters = "ABCDEFGHIJKLMNOPRSTUVYZ"



expect(LicencePlate).to.be.a("function");

const testValues = [];

for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 4; j++) {
        for (let k = 1; k <= 4; k++) {
            let platePart1 = pad(getRandomInt(1, Math.pow(10, i) - 1), 2),
                platePart2 = getRandomSpace(),
                platePart3 = getRandomLetters(j),
                platePart4 = getRandomSpace(),
                platePart5 = pad(getRandomInt(1, Math.pow(10, k) - 1), 2);
            testValues.push({
                testValue: platePart1 + platePart2 + platePart3 + platePart4 + platePart5,
                expectedResult: platePart1 + " " + platePart3.toUpperCase() + " " + platePart5,
                expectedDbValue: platePart1 + platePart3.toLowerCase() + platePart5
            });
        }
    }
}

testValues.push({
        testValue: 1,
        expectedResult: "",
        expectedDbValue: ""
    }, {
        testValue: "1",
        expectedResult: "",
        expectedDbValue: ""
    }, {
        testValue: "1a",
        expectedResult: "",
        expectedDbValue: ""
    }, {
        testValue: "a1",
        expectedResult: "",
        expectedDbValue: ""
    }, {
        testValue: " ",
        expectedResult: "",
        expectedDbValue: ""
    }

);



// console.info(testValues);

testValues.forEach((testInfo) => {
    console.info('testing: ', testInfo, "\n");
    let licencePlate = LicencePlate(testInfo.testValue);
    expect(licencePlate).to.be.an('object').to.have.property('value').which.is.a('string');
    expect(licencePlate.toString()).to.be.equal(licencePlate.valueOf())
        .and.to.be.equal(licencePlate.value).and.to.be.equal(testInfo.expectedResult);
    expect(JSON.parse(JSON.stringify({ value: licencePlate }))).to.be.an('object').to.have.property('value')
        .which.is.a('string').to.be.equal(testInfo.expectedResult);
    expect(licencePlate.toDatabaseFormat()).to.be.a("string").and.to.be.equal(testInfo.expectedDbValue);
});

console.log("All tests have passed");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function getRandomLetters(num) {
    if (num === 0)
        return "";
    else {
        let caseFunction = getRandomInt(0, 1) ? String.prototype.toLowerCase : String.prototype.toUpperCase;
        return caseFunction.call(availableLetters[getRandomInt(0, availableLetters.length - 1)]) + getRandomLetters(num - 1);
    }
}

function getRandomSpace() {
    var maxLen = getRandomInt(0, 1);
    var value = "";
    for (var i = 0; i < maxLen; i++) {
        value += " ";
    }
    return value;
}
