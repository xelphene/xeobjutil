
'use strict';

const {ours} = require('./consts');

function deepHas(o, path)
{
	if( o.hasOwnProperty(path[0]) )
	{
		if( path.length==1 )
			return true;
		else {
			let i = path.shift();
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				return deepHas(o[i], path);
			else
				return false;
		}
	} else
		return false;
}
exports.deepHas = deepHas;


function deepGet(o, path)
{
	if( o.hasOwnProperty(path[0]) )
	{
		if( path.length==1 )
			return o[path[0]];
		else {
			let i = path.shift();
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				return deepGet(o[i], path);
			else
				throw new Error(`unable to traverse ${path}`);
		}
	} else
		throw new Error(`path ${path} not found`);
}
exports.deepGet = deepGet;

