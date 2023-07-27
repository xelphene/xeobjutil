
'use strict';

//const buildProxy = require('object-autobuild').buildProxy;

var sym = Symbol('testSym');

var xeobjutil = require('../index');

var [a,ap] = xeobjutil.init({xePropsEnum:true});
ap.x.strA = 'asdf';
ap.x.x2.v = 'woo';
ap.x.obj = {privobj_A: 900};
ap.x[sym] = 'A sym';
ap.num = 222;


console.log( xeobjutil.deepHas(a, ['x', 'x2', 'v'] ) );
console.log( xeobjutil.deepHas(a, ['x', 'x2'] ) );
console.log( xeobjutil.deepHas(a, ['x', sym] ) );

console.log( xeobjutil.deepHas(a, ['x', 'x2', 'asdf', 'g'] ) );
console.log( xeobjutil.deepHas(a, ['y'] ) );
console.log( xeobjutil.deepHas(a, ['x', 'obj', 'privobj_A'] ) );

console.log('');


console.log( xeobjutil.deepGet(a, ['x', 'x2','v'] ) );
console.log( xeobjutil.deepGet(a, ['x', 'x2' ] ) );
console.log( xeobjutil.deepGet(a, ['x', sym ]  ) );
//console.log( xeobjutil.deepGet(a, ['x', 'obj', 'privobj_A' ] ) );
//console.log( xeobjutil.deepGet(a, ['y', 'f', 'g' ] ) );

console.log('');

xeobjutil.deepSet(a, ['x','x2','u'], 2525);
xeobjutil.deepSet(a, ['x','x3','u'], 2626);

console.log(a);
console.log( xeobjutil.clean(a) );
