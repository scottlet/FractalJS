/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF.extras.mixins');
(function (mixins) {
	var augment,
		OBJMIXINS,
		UIMIXINS;
	augment = function (Nodes) {
		if (!Nodes.augmented) {
			for (var i in UIMIXINS) {
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
			var that = that || this;
			that.domNode.style.display = 'block';
			return (callback) ? callback() : null;
		},
		close: function (callback) {
			var that = that || this;
			that.domNode.style.display = 'none';
			return (callback) ? callback() : null;
		},
		on: function () {
			var that = that || this;
			that.domNode.style.display = 'block';
		},
		off: function () {
			var that = that || this;
			that.domNode.style.display = 'none';
		}
	};
	UIMIXINS = {
		find: function (str) {
			return augment(this.querySelectorAll(str));
		},
		remove: function () {
			var NodeList = this;
			if (!NodeList.item) {
				NodeList = [NodeList];
			}
			var ret = [];
			if (NodeList.length) {
				var l = NodeList.length;
				for (var n = 0; n < l; n++) {
					ret.push(augment(NodeList[n].parentNode.removeChild(NodeList[n])));
				}
				return ret;
			} else {
				return null;
			}
		}
	};
	var NativeUI = function (object) {
		for (var i in OBJMIXINS) {
			if (OBJMIXINS.hasOwnProperty(i)) {
				object[i] = OBJMIXINS[i];
			}
		}
	};
	var NativeSelector = function (id) {
		if (!document.querySelectorAll) {
			throw ('Old browser, please use jQuery mixin');
		}
		var Node = document.getElementById(id);
		augment(Node);
		return Node;
	};
	mixins.NativeUI = NativeUI;
	mixins.NativeSelector = NativeSelector;
}(FF.extras.mixins));
FF.mixins.UI = FF.extras.mixins.NativeUI;
FF.mixins.Selector = FF.extras.mixins.NativeSelector;