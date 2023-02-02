
'use strict';

const ours = require('./consts').ours;
const deepCopy = require('./copy').deepCopy;

/**
 * merge src into dst.
 * dst will be modified. src will be left untouched.
*/
function mergeInPlace(dst, src, path)
{
    if( path===undefined ) path = ['root'];
    var pathStr = path.join('.');
    
    for( let k of Object.getOwnPropertyNames(src).concat(Object.getOwnPropertySymbols(src)) ) {
        if( typeof(src[k]) == 'object' && src[k].hasOwnProperty(ours) ) {
            if( ! (k in dst) ) 
            {
                //dst[k]={ [ours]: true };
                
                dst[k] = {};
                Object.defineProperty(dst[k], ours, {
                    value: true,
                    enumerable: false
                });
                
            }
            if( typeof(dst[k]) != 'object' ) throw new Error(`conflict at ${pathStr}.${k}`);
            
            mergeInPlace(dst[k], src[k], path.concat([k]) );
        } else {
            if( k!==ours )
                dst[k] = src[k];
        }
    }
    return dst;
}
exports.mergeInPlace = mergeInPlace;

/**
 * merge b into a.
 * neither a nor b will be modified.
 * a new object will be returned.
 */
function merge(a,b)
{
    var r = deepCopy(a);
    mergeInPlace(r, b);
    return r;
}
exports.merge = merge;
