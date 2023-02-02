
'use strict';

const ours = require('./consts').ours;

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
            base: undefined
        };
    
    if( options.create===undefined )
        options.create = function() { return {} };
    
    var createOurs = function() {
        let n = options.create();
        Object.defineProperty(n, ours, {
            value: true,
            enumerable: false
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
