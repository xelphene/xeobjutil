
'use strict';

const ours = require('../index').ours;
const deepcopy = require('../index').deepcopy;

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

var c = deepcopy(o);

o.c.cB = 'orig change';
o.c.cO.x = 'orig change';

console.log(c);
