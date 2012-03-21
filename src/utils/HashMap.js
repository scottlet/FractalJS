/**
 * Copyright (c) 2011-2012, Scott van Looy, ThreeSquared.
 * All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of ThreeSquared nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL SCOTT VAN LOOY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

J$.reqNameSpace('J$.utils');

(function (utils) {
	HashMap = function () {
		var that = this, o = {}, len = 0, cloneret = {}, ksret = [], vret = [];
		/** PRIVATE METHODS **/
		var cempty = function(){
			cloneret = {};
			ksret = [];
			vret = [];
		};
		var clear = function(){
			o = {};
		};
		var clone = function(){
			for (var k in o) {
				cloneret[k] = o[k];
			}
			return cloneret;
		};
		var containsKey = function(inkey){
			return (o[inkey]) ? true : false;
		};
		var containsValue = function(inval){
			for (var k in o) {
				if (o[k] === inval) {
					return true;
				}
				return false;
			}
		};
		var get = function(inkey){
			return o[inkey];
		};
		var entrySet = function(){
			ns.Console.warn('not implemented');
		};
		var isEmpty = function(){
			return !len;
		};
		var keySet = function(){
			if (!ksret) {
				for (var k in o) {
					ksret.push(k);
				}
			}
			return ksret;
		};
		var put = function(inkey, inval){
			cempty();
			if (!o[inkey]) {
				len++;
			}
			o[inkey] = inval;
		};
		var putAll = function(inmap){
			cempty();
			for (var k in inmap) {
				if (!o[k]) {
					len++;
				}
				o[k] = inmap[k];
			}
		};
		var remove = function(inkey){
			if (o[inkey]) {
				delete o[inkey];
				len--;
			}
			cempty();
		};
		var size = function(){
			return len;
		};
		var toString = function(){
			var ret = [];
			for (var k in o) {
				ret.push('{' + k + '=' + o[k] + '}');
			}
			return ret.join();
		};
		var values = function(){
			if (!vret) {
				for (var k in o) {
					vret.push(o[k]);
				}
			}
			return vret;
		};
		/** API METHODS **/
		return {
			clear : clear,
			clone : clone,
			containsKey : containsKey,
			containsValue : containsValue,
			entrySet : entrySet,
			get : get,
			isEmpty : isEmpty,
			keySet : keySet,
			put : put,
			putAll : putAll,
			remove : remove,
			size : size,
			toString : toString,
			values : values
		};
	}
	utils.HashMap = HashMap;
}(J$.utils));