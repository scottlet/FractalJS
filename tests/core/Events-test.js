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
	test:false
*/
var foo, getData, customEvent;
TestCase("Test the Events object", {
	setUp : function () {
		foo = {
			id: 'foo',
			onGetData : function (args) {
				getData = true;
				return "got data";
			},
			onCustomEventTrigger : function (args) {
				customEvent = true;
				return "got custom data";
			}
		};
		getData = false;
		customEvent = false;
	},
	tearDown : function () {
		foo = null;
	},
	"test subscription of Events." : function () {
		expectAsserts(1);
		assertNoException(function () {
			FF.Events.subscribe(foo);
		});
	},
	"test publishing of Events" : function () {
		expectAsserts(3);
		assertNoException(function () {
			FF.Events.publish('GET_DATA');
		});
		assertTrue(getData);
		assertFalse(customEvent);
	},
	"test unsubscription of Events." : function () {
		expectAsserts(2);
		FF.Events.subscribe(foo);
		assertNoException(function () {
			FF.Events.unsubscribe(foo);
		});
		FF.Events.publish('GET_DATA');
		assertFalse(getData);
	},
	"test adding of custom Events." : function () {
		expectAsserts(1);
		assertNoException(function () {
			FF.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		});
	},
	"test firing of custom Events." : function () {
		expectAsserts(2);
		FF.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		FF.Events.subscribe(foo);
		FF.Events.publish('CUSTOM_EVENT_TRIGGER');
		assertTrue(customEvent);
		assertFalse(getData);
	},
	"test hasEvent for custom event" : function () {
		FF.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		assertTrue(FF.Events.hasEvent("CUSTOM_EVENT_TRIGGER"));
	}
});