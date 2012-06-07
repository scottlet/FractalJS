/*jslint bitwise: false, sloppy:true, browser: true, newcap:true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
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
	test:false,
	AsyncTestCase:false
*/
TestCase("Test the BaseController object", {
	setUp : function () {
		FF.reqNameSpace('test');
		test.TestController = function () {
			var that = this;
			this.getExampleText = function () {
				return "example text";
			};
			this.enter = function () {
				that.callView(test, 'TestView');
			};
		};
		test.TestView = function () {
			var that = this,
				init = function () {
					return that.enter();
				};
			this.enter = function () {
				return "example text 2";
			};
			init();
		};
		FF.core.views.BaseView.createView(test.TestView);
		test.string = "I think {token1} should be replaced with {token2} and {token3} or {token4}";
		test.tokens = {
			token1 : 'life',
			token3 : 'death',
			token2 : 'taxis',
			token4 : 'bling',
			token6 : 'foo'
		};
	},
	tearDown : function () {
		test.TestController = null;
		test.TestView = null;
	},
	"test creation of controller using createController" : function () {
		expectAsserts(4);
		assertNoException(function () {
			FF.core.controllers.BaseController.createController(test.TestController);
		});
		test.TestController = new test.TestController();
		assertFunction(test.TestController.callView);
		test.TestController.enter();
		assertObject(test.TestView);
		assertEquals(test.TestController.getExampleText(), "example text");
	},
	"test tokenizer" : function () {
		expectAsserts(3);
		FF.core.controllers.BaseController.createController(test.TestController);
		test.TestController = new test.TestController();
		assertEquals('I think life should be replaced with taxis and death or bling', test.TestController.tokeniser(test.string, test.tokens));
		assertNotEquals('I like foo and foo with foo', test.TestController.tokeniser('I like {token5} and {token5} with {token5}', test.tokens));
		assertEquals('I like foo and foo with foo', test.TestController.tokeniser('I like {token6} and {token6} with {token6}', test.tokens));
	}
});
AsyncTestCase("Test the JSONP getData function asynchronously", {
	"test getData" : function (queue) {
		expectAsserts(1);
		var dataObj;
		queue.call('call getData', function (callbacks) {
			var options = {
				url : 'http://api.flickr.com/services/feeds/photos_public.gne?format=json',
				error : function () {
					return 'error';
				},
				jsonp : 'jsonFlickrFeed',
				success : callbacks.add(function (data) {
					dataObj = data;
				})
			};
			FF.core.controllers.BaseController.getData(options);
		});
		queue.call('check getData returned an object from flickr.', function () {
			assertObject(dataObj);
		});
	}
});