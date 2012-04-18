/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF.extras.mixins');
(function (mixins) {
	"use strict";
	var augment,
		OBJMIXINS,
		UIMIXINS,
		that,
		dataObj = {},
		eventBind,
		eventPrefix,
		getAttr = function (str, attr) {
			return str.split(new RegExp('\\b' + attr + '='))[1] || ''.split('&')[0];
		},
		hijack = function (callback) {
			return function (e) {
				if (!e || !e.stopPropagation) {
					e = {
						stopPropagation : window.event.cancelBubble,
						preventDefault : function () {
							window.event.returnValue = false;
						}
					};
				}
				callback(e);
			};
		},
		NativeUI = function (object) {
			var i;
			for (i in OBJMIXINS) {
				if (OBJMIXINS.hasOwnProperty(i)) {
					object[i] = OBJMIXINS[i];
				}
			}
		},
		NativeSelector = function (id) {
			if (!document.querySelectorAll) {
				throw ('Old browser, please use jQuery mixin');
			}
			var Node = document.getElementById(id);
			augment(Node);
			return Node;
		},
		NativeController = function (Controller) {
			Controller.createXHR = function () {
				var xhr,
					XHR = {};
				if (window.XMLHttpRequest) {
					xhr = new window.XMLHttpRequest();
				} else if (window.ActiveXObject) {
					xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
				} else {
					return null;
				}
				XHR.open = function (url, callback, error) {

				};
				XHR.error = function () {

				};
				return XHR;
			};
			Controller.createJSONP = function (cbname) {
				var fn = cbname || 'f' + (new Date().getTime()).toString(16),
					JSONP = {};
				JSONP.open = function (url, callback, error) {
					var c,
						n = 0,
						t,
						cb = function () {
							if (callback) {
								if (c > 10000) {
									if (error) {
										error('Didn\'t get any data after 10s, check ?callback');
									}
								}
								if (typeof dataObj[fn] !== "undefined") {
									callback(dataObj[fn]);
								} else {
									setTimeout(cb, 100);
								}
							}
						};
					t = getAttr(url, 'callback');
					if (t) {
						fn = t;
					} else {
						c = '?';
						if (url.indexOf('?') !== -1) {
							c = '&';
						}
						url += c + '=' + fn;
					}
					window[fn] = function (data) {
						dataObj[fn] = data;
					};
					try {
						FF.loadScript(url, cb, 1, 0, 0, error);
					} catch (ex) {
						error(ex);
					}
				};
				JSONP.error = function () {
					//something
				};
				return JSONP;
			};
		};
	augment = function (Nodes) {
		var i;
		if (!Nodes.augmented) {
			for (i in UIMIXINS) {
				if (UIMIXINS.hasOwnProperty(i)) {
					Nodes[i] = UIMIXINS[i];
				}
			}
			Nodes.augmented = true;
		}
		return Nodes;
	};
	OBJMIXINS = {
		superOpen: function (callback) {
			that = that || this;
			that.domNode.style.display = 'block';
			return (callback) ? callback() : null;
		},
		superClose: function (callback) {
			that = that || this;
			that.domNode.style.display = 'none';
			return (callback) ? callback() : null;
		},
		on: function () {
			that = that || this;
			that.domNode.style.display = 'block';
		},
		off: function () {
			that = that || this;
			that.domNode.style.display = 'none';
		}
	};
	UIMIXINS = {
		find: function (str) {
			return augment(this.querySelectorAll(str));
		},
		remove: function () {
			var NodeList = this,
				ret = [],
				l = NodeList.length,
				n;
			if (!NodeList.item) {
				NodeList = [NodeList];
			}
			for (n = 0; n < l; n++) {
				ret.push(augment(NodeList[n].parentNode.removeChild(NodeList[n])));
			}
			return ret;
		},
		bind : function (str, func) {
			var NodeList = this,
			ret = [],
			l = NodeList.length,
			n;
			if (!NodeList.item) {
				NodeList = [NodeList];
			}
			if (!eventBind) {
				if (NodeList[0].addEventListener) {
					eventBind = 'addEventListener';
					eventPrefix = '';
				} else {
					eventBind = 'attachEvent';
					eventPrefix = 'on';
				}
			}
			for (n = 0; n < l; n++) {
				if (NodeList[n][eventBind]) {
					NodeList[n][eventBind](eventPrefix + str, hijack(func), true);
				}
				ret.push(augment(NodeList[n]));
			}
			return ret;
		}
	};
	mixins.NativeUI = NativeUI;
	mixins.NativeSelector = NativeSelector;
	mixins.NativeController = NativeController;
}(FF.extras.mixins));
FF.mixins.UI = FF.extras.mixins.NativeUI;
FF.mixins.Selector = FF.extras.mixins.NativeSelector;
FF.mixins.Controller = FF.extras.mixins.NativeController;