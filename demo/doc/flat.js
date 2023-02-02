
'use strict';

const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

console.log( xeobjutil.flatHas(a, 'x.obj')  );
console.log( xeobjutil.flatHas(a, 'x.obj.privobj_A')  );

console.log( xeobjutil.flatGet(a, 'x.obj')  );
console.log( xeobjutil.flatGet(a, 'x.obj.privobj_A')  );
