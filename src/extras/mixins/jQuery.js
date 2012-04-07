/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF.extras.mixins');
(function (mixins) {
	"use strict";
	var jQuery = function (object) {
		var OBJMIXINS,
			UIMIXINS,
			i,
			that;
		OBJMIXINS = {
			open: function (callback) {
				that = that || this;
				that.domNode.fadeIn(function () {
					return (callback) ? callback() : null;
				});
			},
			close: function (callback) {
				that = that || this;
				that.domNode.fadeOut(function () {
					that.domNode.hide();
					return (callback) ? callback() : null;
				});
			},
			on: function () {
				that = that || this;
				that.domNode.show();
			},
			off: function () {
				that = that || this;
				that.domNode.show();
			}
		};
		UIMIXINS = {
		};
		for (i in OBJMIXINS) {
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
	mixins.jQuery = jQuery;
}(FF.extras.mixins));
FF.mixins.UI = FF.extras.mixins.jQuery;