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
	"test CreateController method" : function () {
		"use strict";
		expectAsserts(4);
		assertNoException(function () {
			FF.createController(Foo);
			Foo = new Foo();
		});
		assertFunction(Foo.myFunction);
		assertEquals(Foo.myFunction(), 'my function');
		assertFunction(Foo.callView);
	},
	"test CreateView method" : function () {
		"use strict";
		expectAsserts(4);
		assertNoException(function () {
			FF.createView(Foo);
			Foo = new Foo();
		});
		assertFunction(Foo.myFunction);
		assertEquals(Foo.myFunction(), 'my function');
		assertFunction(Foo.requires);
	},
	"test CreateUI method" : function () {
		"use strict";
		expectAsserts(4);
		assertNoException(function () {
			FF.createUI(Foo);
			Foo = new Foo();
		});
		assertFunction(Foo.myFunction);
		assertEquals(Foo.myFunction(), 'my function');
		assertFunction(Foo.setupUI);
	}

});