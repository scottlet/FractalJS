/**
 * @author scottvanlooy
 */
var J$ = (function() {
	/** PRIVATE METHODS **/
	var createInstance = function(item,inheritant){
		item.prototype = inheritant;
		item.constructor = item;
		return new item();
	};
	return {
		/** API METHODS **/
		
		/**
		 * reqNameSpace. Requests a namespace. If the namespace does not exist, it will be created
		 * @param {string} req - request in the format of 'my.name.space'
		 * @param {Object} test
		 */
		reqNameSpace : function(req,test){
			if (!req || typeof req !== "string" || !req.match('\\.')) {
				ns.Console.error('getNameSpace error - requires a string in the format "my.name.space"');
				return null;
			}
			var t = req.split('.')
			, tns = window
			,l = t.length;
			for (var x = 0; x < l; x++) {
				if (tns[t[x]]) {
					tns = tns[t[x]];
				}
				else {
					if(test){
						return false;
					}
					tns = tns[t[x]] = {};
				}
			}
		},
		requires :  function(requires){
			var l = requires.length;
			for (var n = 0; n < l; n++) {
				if (!this.reqNameSpace('ns.'+requires[n], true)) {
					var s = document.createElement('script');
					s.src = this.baseUrl + requires[n].replace(/\./gi, '/') + '.js';
					s.type = 'text/javascript';
					document.head.appendChild(s);
				}
			}
		},
		/**
		 * baseUrl = the base URL for library scripts.
		 */
		baseUrl : (function(){
			var s = document.getElementsByTagName('script');
			var m = s[s.length-1];
			return m.src.replace(/[^\/]+?$/,'');
			
		})(),
		Console : (function(){
			var nlog = function(type){
				if (!window.console) {
					return function(){
						window.alert('type: ' + type + ' ' + arguments);
					};
				}else{
					return function(){
						window.console[type](arguments);
					};
				}
			};
			var log = new nlog('log');
			var warn = new nlog('warn');
			var error = new nlog('error');
			return {
				log:log,
				warn:warn,
				error:error
			};
	
		})(),
		createController : function(object){
			return createInstance(object,J$.controllers.BaseController);
		},
		createView : function(object){
			return createInstance(object,J$.controllers.BaseView);
		},
		createUI : function(object){
			return createInstance(object,J$.controllers.BaseUI);
		}
	};
})();

/** Core library requires **/
/** INCLUDES **/

J$.requires(
	[
		// utils
		'utils.Core',
		'utils.ArrayUtils',
		'utils.HashMap',
		
		//Controllers
		'controllers.BaseController',
		
		// Views
		'views.BaseView',
		
		//uis
		'uis.BaseUI',
		
		// mixins - choose one, dependent on library used.
		'mixins.jQuery'
	]
);
