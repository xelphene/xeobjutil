
'use strict';

const ours = require('./consts').ours;

function clean(o) {
    var o2 = {};
    for( let k of Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o)) ) {
        if( k===ours ) continue;
        if( typeof(o[k])=='object' && o[k].hasOwnProperty(ours) )
            o2[k] = clean(o[k]);
        else
            o2[k] = o[k];
    }
    return o2;
}
exports.clean = clean;

