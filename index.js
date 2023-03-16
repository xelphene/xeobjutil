
'use strict';

exports.ours = require('./consts').ours;

exports.init = require('./build').init;
exports.make = require('./build').make;
exports.clean = require('./clean').clean;
exports.merge = require('./merge').merge;
exports.mergeInPlace = require('./merge').mergeInPlace;
exports.deepCopy = require('./copy').deepCopy;
exports.collapse = require('./flat').collapse;
exports.flatHas = require('./flat').flatHas;
exports.flatGet = require('./flat').flatGet;
