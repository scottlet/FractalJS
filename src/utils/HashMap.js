J$.reqNameSpace('J$.utils');
J$.utils.HashMap = function(){
	var that = this, o = {}, len = 0, cloneret = {}, ksret = [], vret = [];
	/** PRIVATE METHODS **/
	var cempty = function(){
		cloneret = {};
		ksret = [];
		vret = [];
	};
	/** API METHODS **/
	return {
		clear : function(){
			o = {};
		},
		clone : function(){
			if (!cloneret) {
				for (var k in o) {
					cloneret[k] = o[k];
				}
			}
			return cloneret;
		},
		containsKey : function(inkey){
			return (o[inkey]) ? true : false;
		},
		containsValue : function(inval){
			for (var k in o) {
				if (o[k] === inval) {
					return true;
				}
				return false;
			}
		},
		entrySet : function(){
			ns.Console.warn('not implemented');
		},
		get : function(inkey){
			return o[inkey];
		},
		isEmpty : function(){
			return !len;
		},
		keySet : function(){
			if (!ksret) {
				for (var k in o) {
					ksret.push(k);
				}
			}
			return ksret;
		},
		put : function(inkey, inval){
			cempty();
			if (!o[inkey]) {
				len++;
			}
			o[inkey] = inval;
		},
		putAll : function(inmap){
			cempty();
			for (var k in inmap) {
				if (!o[k]) {
					len++;
				}
				o[k] = inmap[k];
			}
		},
		remove : function(inkey){
			if (o[inkey]) {
				delete o[inkey];
				len--;
			}
			cempty();
		},
		size : function(){
			return len;
		},
		toString : function(){
			var ret = [];
			for (var k in o) {
				ret.push('{' + k + '=' + o[k] + '}');
			}
			return ret.join();
		},
		values : function(){
			if (!vret) {
				for (var k in o) {
					vret.push(o[k]);
				}
			}
			return vret;
		}
	};
};