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
		open: function (callback) {
			that = that || this;
			that.domNode.style.display = 'block';
			return (callback) ? callback() : null;
		},
		close: function (callback) {
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
		}
	};
	mixins.NativeUI = NativeUI;
	mixins.NativeSelector = NativeSelector;
}(FF.extras.mixins));
FF.mixins.UI = FF.extras.mixins.NativeUI;
FF.mixins.Selector = FF.extras.mixins.NativeSelector;