
'use strict';

//const buildProxy = require('object-autobuild').buildProxy;

var sym = Symbol('testSym');

var xeobjutil = require('../index');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.x2.v = 'woo';
ap.x.obj = {privobj_A: 900};
ap.x[sym] = 'A sym';
ap.num = 222;


console.log( xeobjutil.flatHas(a, 'x.x2.v') );
console.log( xeobjutil.flatHas(a, 'x.x2') );

console.log( xeobjutil.flatHas(a, 'x.x2.asdf.g') );
console.log( xeobjutil.flatHas(a, 'y') );
console.log( xeobjutil.flatHas(a, 'x.obj.privobj_A') );

console.log('');

console.log( xeobjutil.flatGet(a, 'x.x2.v') );
console.log( xeobjutil.flatGet(a, 'x.x2') );
//console.log( xeobjutil.flatGet(a, 'x.obj.privobj_A') );
//console.log( xeobjutil.flatGet(a, 'y.f.g') );


console.log('');

console.log( xeobjutil.collapse(a) );
