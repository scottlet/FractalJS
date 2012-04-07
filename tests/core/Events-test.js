/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */

/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, test:false, assertObject:false*/
var foo;
TestCase("Test the Events object", {
	setUp : function () {
		foo = {
			id: 'foo',
			onGetData : function (args) { 
				return "got data";
			},
			onCustomEventTrigger : function (args) {
				return "got custom data";
			}
		};
	},
	tearDown : function () {
		foo = null;
	},
	"test registration of Events." : function () {
		expectAsserts(1);
		assertNoException(function () {
			FF.Events.subscribe(foo);
		});
	},
	"test triggering of Events" : function () {
		expectAsserts(1);
		assertNoException(function () {
			FF.Events.publish('GET_DATA');
		});
	}
});