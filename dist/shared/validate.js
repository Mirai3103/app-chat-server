"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserInput = void 0;
const errors_1 = require("../shared/errors");
const GENDERS = ['MALE', 'FEMALE', 'ORTHER'];
const validateUserInput = (data) => {
    console.log(data);
    if (data.fullName === undefined || data.fullName === null || data.fullName.trim() == '') {
        throw new errors_1.InvalidParameterError('Full name is not valid');
    }
    if (data.username === undefined || data.username === null || data.username.trim() == '') {
        throw new errors_1.InvalidParameterError('Username is not valid');
    }
    if (data.password === undefined || data.password === null || data.password.trim() == '') {
        throw new errors_1.InvalidParameterError('Password is not valid');
    }
    if (data.password === undefined || data.password === null || data.password.trim() == '' || !GENDERS.includes(data.gender.toUpperCase())) {
        throw new errors_1.InvalidParameterError("Gender is not valid");
    }
};
exports.validateUserInput = validateUserInput;
