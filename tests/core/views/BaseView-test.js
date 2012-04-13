/*jslint bitwise: false, sloppy:true, browser: true, newcap:true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint newcap:false*/
/*globals
	FF:false,
	TestCase:false,
	assertEquals:false,
	expectAsserts:false,
	assertFunction:false,
	assertNotUndefined:false,
	assertNoException:false,
	assertObject:false,
	assertTrue,
	assertFalse,
	assertException:false,
	assertNotEquals:false,
	test:false
*/
TestCase("Test the BaseView object", {
	setUp : function () {
		FF.reqNameSpace('test');
		test.TestView = function () {
			var that = this,
				init = function () {
					return that.enter();
				};
			this.enter = function () {
				return "example text";
			};
			init();
		};
		test.TestView2 = function () {
			var that = this,
				init = function () {
					return that.enter();
				};
			this.enter = function () {
				return "example text 2";
			};
			init();
		};
		FF.reqNameSpace('test.uis');
		test.uis.UI1 = function (view) {
			this.id = 'ui1';
			this.view = view;
		};
		test.uis.UI2 = function (view) {
			this.id = 'ui2';
			this.view = view;
		};
		test.uis.UI3 = function (view) {
			this.id = 'ui3';
			this.view = view;
		};
		FF.core.uis.BaseUI.createUI(test.uis.UI1);
		FF.core.uis.BaseUI.createUI(test.uis.UI2);
		FF.core.uis.BaseUI.createUI(test.uis.UI3);
	},
	tearDown : function () {
		test.TestView = null;
		test.uis = null;
	},
	"test createView" : function () {
		expectAsserts(1);
		assertNoException(function () {
			FF.core.views.BaseView.createView(test.TestView);
		});
	},
	"test view can be instantiated" : function () {
		expectAsserts(1);
		test.TestView = new test.TestView();
		assertObject(test.TestView);
	},
	"test BaseView API methods exist on new child View" : function () {
		expectAsserts(6);
		FF.core.views.BaseView.createView(test.TestView);
		test.TestView = new test.TestView();
		assertFunction(test.TestView.setDefaultComponents);
		assertFunction(test.TestView.requires);
		assertFunction(test.TestView.createView);
		assertNotUndefined(test.TestView.uis);
		assertNotUndefined(test.TestView.controller);
		assertEquals(test.TestView.enter(), "example text");
	},
	"test BaseView API method setDefaultComponents" : function () {
		expectAsserts(2);
		FF.core.views.BaseView.createView(test.TestView);
		test.TestView = new test.TestView();
		assertFunction(test.TestView.setDefaultComponents);
		assertNoException(function () {
			test.TestView.setDefaultComponents(test.uis, ['UI1']);
		});
	},
	"test BaseView API method requires" : function () {
		expectAsserts(13);
		FF.core.views.BaseView.createView(test.TestView);
		FF.core.views.BaseView.createView(test.TestView2);
		test.TestView = new test.TestView();
		test.TestView2 = new test.TestView2();
		test.TestView.setDefaultComponents(test.uis, ['UI1']);
		test.TestView.requires(test.uis, ['UI2', 'UI3'], test.TestView);
		assertEquals('example text', test.TestView.uis.UI3.view.enter());
		test.TestView2.requires(test.uis, ['UI2'], test.TestView2);
		assertObject(test.TestView.uis.UI1);
		assertObject(test.TestView.uis.UI2);
		assertObject(test.TestView.uis.UI3);
		assertEquals("ui1", test.TestView.uis.UI1.id);
		assertEquals("ui2", test.TestView.uis.UI2.id);
		assertEquals("ui3", test.TestView.uis.UI3.id);
		assertObject(test.TestView2.uis.UI1);
		assertObject(test.TestView2.uis.UI2);
		assertUndefined(test.TestView2.uis.UI3);
		assertEquals("ui1", test.TestView2.uis.UI1.id);
		assertEquals("ui2", test.TestView2.uis.UI2.id);
		assertEquals('example text 2', test.TestView2.uis.UI1.view.enter());
	}
});