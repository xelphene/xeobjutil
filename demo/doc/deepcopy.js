
'use strict';

const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

var c = xeobjutil.deepCopy(a);

console.log(c);
