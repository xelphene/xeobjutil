
'use strict';

//const buildProxy = require('object-autobuild').buildProxy;

var sym = Symbol('testSym');

var xeobjutil = require('../index');

function getNewObj() {
    return {};
    //return {always: 222};
}

var [a,ap] = xeobjutil.init({create: getNewObj});
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.x[sym] = 'A sym';
ap.num = 222;

var [b, bp] = xeobjutil.init({create: getNewObj});
bp.x.strB = 'otherstr';
bp.y.somey = 'some y value';
bp.x.obj = {privobj_B: 800};
bp.x[sym] = 'B sym';

console.log(a);
console.log(b);

/*
console.log('');
console.log('--- mergeInPlace ---');
xeobjutil.mergeInPlace(a, b);
console.log(a);
*/

console.log('');
console.log('--- merge ---');
var m = xeobjutil.merge(a, b);
console.log(m);

console.log('');
console.log('--- merge clean ---');
var mc = xeobjutil.clean(m);
console.log(mc);

console.log('');
console.log('--- orig A post merge ---');
console.log(a);

console.log('');
console.log('--- orig B post merge ---');
console.log(b);



/*
console.log('');
var c = xeobjutil.clean(a);
console.log(c);
*/
