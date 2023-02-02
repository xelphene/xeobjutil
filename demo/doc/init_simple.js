
'use strict';

var xeobjutil = require('xeobjutil');

var [o,p] = xeobjutil.init();

p.nested1.nested2.value = 222;
p.nested1.value2 = {x:333};

console.log(o);
// { nested1: { nested2: { value: 222 }, value2: { x: 333 } } }

