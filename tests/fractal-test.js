/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, assertUndefined:false, assertObject:false*/
var Foo;
TestCase("Test the fractaljs methods", {
	setUp: function () {
		delete FF.namespace;
		delete FF.extras.Dummy;
		Foo = function () {
			"use strict";
			this.myFunction = function () {
				return 'my function';
			};
		};
		FF.reqNameSpace('FF.extras');
		(function () {
			var Dummy = {
				iExist : function () {
					return 'iDo';
				}
			};
			FF.extras.Dummy = Dummy;
		}());
	},
	tearDown: function () {
		Foo = null;
		FF.extras.Dummy = null;
	},
	"test Function.prototype.partial method" : function () {
		expectAsserts(3);
		var displayText = function () {
			var ret = [], l = arguments.length, n = 0;
			while (n < l) {
				ret.push(arguments[n]);
				n = n + 1;
			}
			return ret.join('');
		};
		assertEquals("I think I might go out", displayText('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
		var simonSays = displayText.partial('Simon says, "', undefined, '".');
		assertEquals("Simon says, \"I think I might go out\".", simonSays('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
		simonSays = displayText.partial('"', undefined, '", Simon says.');
		assertEquals("\"I think I might go out\", Simon says.", simonSays('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
	},
	"test reqNameSpace function to request a namespace" : function () {
		expectAsserts(4);
		assertUndefined(FF.namespace);
		FF.reqNameSpace('FF.namespace');
		assertObject(FF.namespace);
		FF.reqNameSpace('FF.core.views');
		assertObject(FF.core.views);
		FF.reqNameSpace('FF.core.views.namespace');
		assertObject(FF.core.views.namespace);
	},
	"test requires function to request an additional module" : function () {
		expectAsserts(1);
		FF.requires('extras.Dummy', function () {
			assertObject(FF.extras.Dummy);
		});
		FF.requires('extras.Foo', function () {
			// should never get here
			assertObject(FF.extras.Dummy);
		});
	},
	"test augmentObject function to add items to an object" : function () {
		expectAsserts(1);
		var o = FF.augmentObject({});
		assertFunction(o.extend);
	},
	"test extend function to extend a function with another function" : function () {
		expectAsserts(3);
		var obj1 = function () {
			this.method1 = 'method1';
		},
		obj2 = function () {
			this.method2 = 'method2';
		},
		o = FF.augmentObject({});
		assertNoException(function () {
			o.extend(obj1, obj2);
		});
		obj1 = new obj1();
		assertEquals('method1', obj1.method1);
		assertEquals('method2', obj1.method2);
	}
});