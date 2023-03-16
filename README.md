
# Overview

xeobjutil is a collection of miscellaneous utility functions for
manipulating objects.

# API Summary

## init

Create a new object. Return it and a Proxy over it enabling automatic
deep-setting and other features in this library.

```
var xeobjutil = require('xeobjutil');

var [o,p] = xeobjutil.init();

p.nested1.nested2.value = 222;
p.nested1.value2 = {x:333};

console.log(o);
// { nested1: { nested2: { value: 222 }, value2: { x: 333 } } }
```

init takes a named argument named `create` which is a function that returns
an object to use as a template any time a new object needs to be created.

```
var xeobjutil = require('xeobjutil');

function getNewObj() {
    return {always: 222};
}

var [o,p] = xeobjutil.init({create: getNewObj});

p.x.y = 'asdf';
p.x.o = {z:1};

console.log(o);
// { always: 222, x: { always: 222, y: 'asdf', o: { z: 1 } } }
```

Note that the objects created automatically as a result of the assignments
via the Proxy have an `always: 222` property but the object literal
assignment does not.

## make

A functional shortcut for constructing objects with xeobjutil:

```
var xeobjutil = require('xeobjutil');

var o = xeobjutil.make( p => {
    p.a.b = 222;
    p.x.y.z = 222.1;
});

console.log(o);
// { a: { b: 222 }, x: { y: { z: 222.1 } } }
```

## clean

xeobjutil adds a non-enumerable Symbol property to each object it creates so
that it knows which objects to recurse into when the becomes necessary.
`clean` removes this and leaves you with only the exact object created.
xeobjutil can no longer be used on the object once this is done.

```
var xeobjutil = require('xeobjutil');

var [o,p] = xeobjutil.init();

p.x = {y:222};

console.log(o[xeobjutil.ours]);   // true
console.log(o.x[xeobjutil.ours]); // undefined

o = xeobjutil.clean(o);

console.log(o[xeobjutil.ours]);   // undefined
console.log(o.x[xeobjutil.ours]); // undefined
```

## mergeInPlace

Merge one object into another.


```
const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

var [b, bp] = xeobjutil.init();
bp.x.strB = 'otherstr';
bp.y.somey = 'some y value';
bp.x.obj = {privobj_B: 800};

xeobjutil.mergeInPlace(a, b);

console.log(a);
// { x: { strA: 'asdf', obj: { privobj_B: 800 }, strB: 'otherstr' },
//   num: 222,
//   y: { somey: 'some y value' } }

console.log(b);
// { x: { strB: 'otherstr', obj: { privobj_B: 800 } },
//   y: { somey: 'some y value' } }
```

Note that literal objects assigned above, ap.x.obj and bp.x.obj, were not
touched. bp.x.obj overwrote ap.x.obj in the merge operation. Only objects
created by xeobjutil were recursively merged.

## merge

Also merge one object into another, but create a copy and leave the
originals untouched.

```
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
// { x: { strA: 'asdf', obj: { privobj_A: 900 } }, num: 222 }

console.log(b);
// { x: { strB: 'otherstr', obj: { privobj_B: 800 } },
//   y: { somey: 'some y value' } }

console.log(m);
// { x: { strA: 'asdf', obj: { privobj_B: 800 }, strB: 'otherstr' },
//   num: 222,
//  y: { somey: 'some y value' } }
```

## deepcopy

Create a deep copy of xeobjutil-created objects.

```
const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

var c = xeobjutil.deepCopy(a);

console.log(c);
// same as a
```

## collapse

Flatten nested xeobjutil objects into a single object. Property names will
be stringified and joined by a dot, by default.

```
const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

var c = xeobjutil.collapse(a);
console.log(c);
// { 'x.strA': 'asdf', 'x.obj': { privobj_A: 900 }, num: 222 }

var c2 = xeobjutil.collapse(a, {sepChar:'/'});
console.log(c2);
// { 'x/strA': 'asdf', 'x/obj': { privobj_A: 900 }, num: 222 }

```

## flatHas / flatGet

Given a string specifying a "path" through some xeobjutil-created objects,
return true/false if a property exists there or return the value of it.

```
const xeobjutil = require('xeobjutil');

var [a,ap] = xeobjutil.init();
ap.x.strA = 'asdf';
ap.x.obj = {privobj_A: 900};
ap.num = 222;

console.log( xeobjutil.flatHas(a, 'x.obj')  );
// true
console.log( xeobjutil.flatHas(a, 'x.obj.privobj_A')  );
// false

console.log( xeobjutil.flatGet(a, 'x.obj')  );
// { privobj_A: 900 }
console.log( xeobjutil.flatGet(a, 'x.obj.privobj_A')  );
// exception
```

# Copyright and License

Copyright (C) 2023 Steve Benson

See the LICENSE file for license info.
