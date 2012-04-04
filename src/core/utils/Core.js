/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * reqNameSpace - requests a namespace associated with the internal ns namespace
 * @param {string} req - string representing the namespace requested, eg 'ns.util.foo'
 */
FF.reqNameSpace('FF.core.utils');
(function (utils) {
	"use strict";
	/** empty function, used as a stub **/
	var empty = function () {};
	utils.Console = empty;
}(FF.core.utils));