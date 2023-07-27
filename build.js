
'use strict';

const {ours, xeObjCreate} = require('./consts');

const clean = require('./clean').clean;

function getHandler(create)
{
    return {
        get: function(obj, prop) {
            if( prop===ours ) return true;
            
            if( typeof(prop)=='symbol')
                return Reflect.get(...arguments);
            if( prop=='inspect' )
                return Reflect.get(...arguments);
            
            //console.log(`GET ${prop.toString()}`);
            if( ! obj.hasOwnProperty(prop) ) {
                //console.log('  create');
                obj[prop] = create();
            }
            
            if( typeof(obj[prop]) == 'object' && obj[prop].hasOwnProperty(ours) ) {
                //console.log('  sub-proxy');
                return new Proxy(obj[prop], getHandler(create));
            } else {
                //console.log('  normal get');
                return Reflect.get(...arguments);
            }
        }
    }
}


function init (options)
{
    if( options===undefined )
        options = {
            create: undefined,
            base: undefined,
            xePropsEnum: undefined,
        };
    
    if( options.xePropsEnum===undefined )
        options.xePropsEnum = false;
    if( options.create===undefined )
        options.create = function() { return {} };
    
    var createOurs = function() {
        let n = options.create();
        Object.defineProperty(n, ours, {
            value: true,
            enumerable: options.xePropsEnum
        });
        Object.defineProperty(n, xeObjCreate, {
            value: createOurs,
            enumerable: options.xePropsEnum
        });
        return n;
    }
    
    if( options.base === undefined )
        var o = createOurs();
    else
        var o = options.base;
    
    var p = new Proxy(o, getHandler(createOurs));
    
    return [o,p];
};
exports.init = init;

function make (f) {
    var [o,p] = init();
    f(p);
    o = clean(o);
    return o;
};
exports.make = make;

function convert(origObject, options)
{
    if( options===undefined )
        options = {
            recurse: undefined,
            iterProps: undefined,
        };
    
    if( options.recurse===undefined )
        options.recurse = o => ! Array.isArray(o);
    if( options.iterProps===undefined )
        options.iterProps = Object.keys;

    var [o,p] = init();

    for( let k of options.iterProps(origObject) )
    {
        if( typeof(origObject)[k]=='object' && options.recurse(origObject[k]) ) {
            let [o2,p2] = convert(origObject[k], options);
            o[k] = o2;
        } else {
            o[k] = origObject[k];
        }
    }

    return [o,p];
}
exports.convert = convert;
