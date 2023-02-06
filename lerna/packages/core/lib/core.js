'use strict';

const utils = require('@dyy/utils')

module.exports = core;

function core() {
    console.log(utils())
    return "Hello from core";
}

core()
