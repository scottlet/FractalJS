/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author Scott van Looy
 * @constructor
 */
FF.reqNameSpace('FF.core.controllers');
(function (controllers) {
	"use strict";
	var BaseController = FF.augmentObject({}),
		xhrlist = [];
	/** Private methods **/
	/** Public methods **/
	/**
	 * On enter of your child controller, you call the view associated with that controller
	 * using the callView method. It either instantiates the view or if it already exists
	 * it calls "enter" on it. Your view's init must also call enter
	 * @param  {Object} namespace your namespace
	 * @param  {string} view      the name of the view you're calling.
	 * @return {Object}           returns the instantiated view.
	 */
	BaseController.callView = function (namespace, view) {
		var ret;
		if (typeof namespace[view] === "function") {
			namespace[view] = new namespace[view]();
			namespace[view].controller = this;
			this.view = namespace[view];
		} else {
			namespace[view].enter();
		}
		return namespace[view];
	};
	/**
	 * removes tokens in a string and replaces them with values.
	 * @param  {string} string  the string to replace tokens in:
	 * in the format of "this is my/{token1}-{token2}/string/{token-3}"
	 * @param  {[type]} tokens an object of tokens to replace:
	 * {
	 *   token1: 'bert',
	 *   token2: 'fred',
	 *   token3: 12
	 * }
	 * @return {string}         tokenised string.
	 */
	BaseController.tokeniser = function (string, tokens) {
		var token;
		for (token in tokens) {
			if (tokens.hasOwnProperty(token)) {
				string = string.split('{' + token + '}').join(tokens[token]);
			}
		}
		return string;
	};
	/**
	 * getData - gets DATA from an external resource using JSON/JSONP. Will POST
	 * for JSON requests, can only GET for JSONP. Technically, JSONP is insecure,
	 * be very careful when using it, make sure the 3rd party is trustworthy.
	 * @param  {Object} options an object containing the information you require.
	 * {
	 *   url:{string},         the URL we get the data from. If JSONP, should either
	 *                         include ?callback= parameter for services that don't
	 *                         allow dynamic callback assignments, or be callback
	 *                         parameter free to allow this code to assign one.
	 *
	 *   data:{string},        name value pairs
	 *
	 *   success:{function()}, callback function on success. This will be passed
	 *                         a data object.
	 *
	 *   error:{function()},   callback function to do something on error. This will
	 *                         be passed an object representing the error.
	 *
	 *   jsonp:{string}        when set, forces JSONP with the specified string
	 *                         as callback name
	 * }
	 */
	BaseController.getData = function (options) {
		var xhr;
		if (options.url && typeof options.url === "string") {
			if (!BaseController.createXHR || !BaseController.createJSONP) {
				FF.mixins.Controller(BaseController);
			}
			// If we're on the same domain, we need to do an XHR request, if not we do a JSONP.
			if (options.url.indexOf(window.location.host) !== -1 && !options.jsonp) {
				xhr = BaseController.createXHR();
			} else {
				xhr = BaseController.createJSONP(options.jsonp);
			}
			xhr.open(options.url, options.success, options.error);
		}
	};
	/**
	 * createController - takes an object and extends it with the BaseController
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseController.createController = BaseController.extend.curry(undefined, BaseController);
	controllers.BaseController = BaseController;
}(FF.core.controllers));
