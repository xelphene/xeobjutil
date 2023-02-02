
'use strict';

var xeobjutil = require('xeobjutil');

function getNewObj() {
    return {always: 222};
}

var [o,p] = xeobjutil.init({create: getNewObj});

p.x.y = 'asdf';
p.x.o = {z:1};

console.log(o);
