
'use strict';

const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

var [b, bp] = xeobjutil.init();
bp.x.strB = 'otherstr';
bp.y.somey = 'some y value';
bp.x.obj = {privobj_B: 800};

var m = xeobjutil.merge(a, b);

console.log(a);

console.log(b);

console.log(m);
