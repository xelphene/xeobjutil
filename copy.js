
'use strict';

const ours = require('./consts').ours;

function deepCopy(o)
{
    var rv = {};
    Object.defineProperty(rv, ours, {
        value: true,
        enumerable: false
    });
    for( let k of Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o)) ) {
        if( typeof(o[k]) == 'object' && o[k].hasOwnProperty(ours) ) {
            rv[k] = deepCopy(o[k]);
        } else {
            if( k!==ours )
                rv[k] = o[k];
        }
    }
    return rv;
}
exports.deepCopy = deepCopy;