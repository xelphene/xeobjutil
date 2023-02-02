
'use strict';

var xeobjutil = require('xeobjutil');

var [o,p] = xeobjutil.init();

p.x = {y:222};

console.log(o[xeobjutil.ours]);   // true
console.log(o.x[xeobjutil.ours]); // undefined

o = xeobjutil.clean(o);

console.log(o[xeobjutil.ours]);   // undefined
console.log(o.x[xeobjutil.ours]); // undefined
