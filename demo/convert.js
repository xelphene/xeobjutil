
'use strict';

var xeobjutil = require('xeobjutil');

const origObject = {
    a: {
        arr: [1,2],
        d: new Date(),
    },
    b: {
        v: 222
    },
    c: {
        vc: 333
    }
};

function recursePredicate(o) {
    if( Array.isArray(o) )
        return false;
    if( o instanceof Date )
        return false;
    if( o.vc === 333 )
        return false;
    return true;
}

var [o,p] = xeobjutil.convert(origObject, {recurse: recursePredicate});
//var [o,p] = xeobjutil.convert(origObject);

p.x.y = 'asdf';
p.x.o = {z:1};

console.log('');

console.log(p.x.o.z);
console.log(p.x.y);

console.log('');
console.log(o);
console.log('');
console.log('--- clean ---');
var c = xeobjutil.clean(o);
console.log(c);

console.log('');

