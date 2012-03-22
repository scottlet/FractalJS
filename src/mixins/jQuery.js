/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF.mixins');
FF.mixins.UI = function (object) {
	var OBJMIXINS = {
		open: function (callback) {
			var that = that || this;
			that.domNode.fadeIn(function () {
				return (callback) ? callback() : null;
			});
		},
		close: function (callback) {
			var that = that || this;
			that.domNode.fadeOut(function () {
				that.domNode.hide();
				return (callback) ? callback() : null;
			});
		},
		on: function () {
			var that = that || this;
			that.domNode.show();
		},
		off: function () {
			var that = that || this;
			that.domNode.show();
		}
	};
	var UIMIXINS = {
	};
	for (var i in OBJMIXINS) {
		if (OBJMIXINS.hasOwnProperty(i)) {
			object[i] = OBJMIXINS[i];
		}
	}
	for (i in UIMIXINS) {
		if (UIMIXINS.hasOwnProperty(i)) {
			object[i] = UIMIXINS[i];
		}
	}
};