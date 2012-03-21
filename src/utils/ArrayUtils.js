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

/**
 * @author Scott van Looy
 */
J$.reqNameSpace('J$.utils');
/**
 * takes two arrays of strings and combines them, removing duplicates
 * @param arr1 {Array} - first array to combine
 * @param arr2 {Array} - second array to combine
 * @return ret {Array} - deduped unsorted array of strings
 */
J$.utils.ArrayUtils = (function(){
/** API METHODS **/ 
	return {
		combine: function (arr1, arr2) {
			var tarr = arr1.concat(arr2), l = tarr.length, o = {}, ret = [];
			while (l--) {
				o[tarr[l]] = true;
			}
			for (var name in o) {
				if(o.hasOwnProperty(name)) {
					ret.push(name);
				}
			}
			return ret;
		}
	};
})();