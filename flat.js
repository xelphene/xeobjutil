
'use strict';

const {ours, defaultSepChar} = require('./consts');

function collapse(o, options)
{
	if( options===undefined )
		options = {
			sepChar: defaultSepChar
		};
	
	//var o2 = { [ours]: true };
	var o2 = {};
	Object.defineProperty(o2, ours, {
		value: true,
		enumerable: false
	});
	
	//Object.keys(o).forEach( k => {
	Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o)).forEach( k => {
		let ks = k.toString();
		if( typeof(o[k]) == 'object' && o[k].hasOwnProperty(ours) ) {
			var nv = collapse(o[k], options);
			Object.keys(nv).forEach( k2 => {
				if( k2 != '' ) {
					o2[ks+options.sepChar+k2] = nv[k2];
				} else {
					o2[ks] = nv[k2];
				}
			});
		} else {
			if( k!==ours )
				o2[ks] = o[k];
		}
	});
	return o2;
}
exports.collapse = collapse;

function flatHas(o, pathStr, options)
{
	if( options===undefined )
		options = {
			sepChar: defaultSepChar,
			path: pathStr.split(defaultSepChar)
		}
		
	if( options.path===undefined )
		options.path = pathStr.split(options.sepChar);

	if( o.hasOwnProperty(options.path[0]) )
	{
		if( options.path.length==1 )
			return true;
		else {
			let i = options.path.shift();
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				return flatHas(o[i], pathStr, options);
			else
				return false;
		}
	} else
		return false;
}
exports.flatHas = flatHas;

function flatGet(o, pathStr, options)
{
	if( options===undefined )
		options = {
			sepChar: defaultSepChar,
			path: pathStr.split(defaultSepChar)
		}
		
	if( options.path===undefined )
		options.path = pathStr.split(options.sepChar);

	if( o.hasOwnProperty(options.path[0]) )
	{
		if( options.path.length==1 )
			return o[options.path[0]];
		else {
			let i = options.path.shift();
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				return flatGet(o[i], pathStr, options);
			else
				throw new Error(`unable to traverse ${pathStr}`);
		}
	} else
		throw new Error(`path ${pathStr} not found`);
}
exports.flatGet = flatGet;
