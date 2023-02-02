
'use strict';

//const buildProxy = require('object-autobuild').buildProxy;

var xeobjutil = require('xeobjutil');

function getNewObj() {
    return {always: 222};
}

var [o,p] = xeobjutil.init({create: getNewObj});

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

