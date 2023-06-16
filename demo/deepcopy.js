
'use strict';

const ours = require('../index').ours;
const deepCopy = require('../index').deepCopy;

var o = {
    a: 1,
    b: 'bee',
    c: {
        [ours]: true,
        cA: 'A',
        cB: 'orig value',
        cO: {
            x: 123
        }
    },
};

var c = deepCopy(o);

o.c.cB = 'changed in orig';
o.c.cO.x = 'changed in orig';

console.log(o.c.cB); // 'changed in orig'
console.log(c.c.cB); // 'orig value'

// both 'changed in orig' because the object at o.c.cO is not an
// xeobjutil-marked object so it wasn't deep-copied.  o.c.cO and c.c.cO are
// references to the same JS object.
console.log(o.c.cO.x);
console.log(c.c.cO.x);
