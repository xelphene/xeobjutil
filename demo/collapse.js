
'use strict';

//const buildProxy = require('object-autobuild').buildProxy;

var sym = Symbol('testSym');

var xeobjutil = require('../index');

function getNewObj222() {
    //return {};
    return {always: 222};
}

var [a,ap] = xeobjutil.init({create: getNewObj222});
console.log('');

ap.x.strA = 'asdf';
ap.x.x2.v = 'woo';
ap.x.obj = {privobj_A: 900};
ap.x[sym] = 'A sym';
ap.num = 222;

console.log(a);

console.log('');

var ac = xeobjutil.collapse(a);
console.log(ac);

/*
var [b, bp] = xeobjutil.init({});
bp.x.strB = 'otherstr';
bp.x.x2.blah = 'blah';
bp.y.somey = 'some y value';
bp.x.obj = {privobj_B: 800};
bp.x[sym] = 'B sym';

//var ac = xeobjutil.collapse(a);
//console.log(ac);

var bc = xeobjutil.collapse(b);
console.log(bc);
*/
