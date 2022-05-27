"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = require("bcrypt");
const SALT_ROUNDS = 10;
function hash(password) {
    return (0, bcrypt_1.hashSync)(password, (0, bcrypt_1.genSaltSync)(SALT_ROUNDS));
}
exports.hash = hash;
function compare(password, hash) {
    return (0, bcrypt_1.compareSync)(password, hash);
}
exports.compare = compare;
