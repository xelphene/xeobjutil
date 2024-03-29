
'use strict';

exports.ours = require('./consts').ours;

exports.init = require('./build').init;
exports.make = require('./build').make;
exports.convert = require('./build').convert;
exports.clean = require('./clean').clean;
exports.merge = require('./merge').merge;
exports.mergeInPlace = require('./merge').mergeInPlace;
exports.deepCopy = require('./copy').deepCopy;
exports.collapse = require('./flat').collapse;
exports.flatHas = require('./flat').flatHas;
exports.flatGet = require('./flat').flatGet;
exports.deepHas = require('./deep').deepHas;
exports.deepGet = require('./deep').deepGet;
exports.deepSet = require('./deep').deepSet;
