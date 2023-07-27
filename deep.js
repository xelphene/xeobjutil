
'use strict';

const {ours} = require('./consts');

function deepHas(o, path)
{
	if( o.hasOwnProperty(path[0]) )
	{
		if( path.length==1 )
			return true;
		else {
			//let i = path.shift();
			let i = path[0];
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				//return deepHas(o[i], path);
				return deepHas(o[i], path.slice(1));
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
			//let i = path.shift();
			let i = path[0];
			if( typeof(o[i])=='object' && o[i].hasOwnProperty(ours) )
				//return deepGet(o[i], path);
				return deepGet(o[i], path.slice(1));
			else
				throw new Error(`unable to traverse ${path}`);
		}
	} else
		throw new Error(`path ${path} not found`);
}
exports.deepGet = deepGet;

