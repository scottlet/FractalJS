/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs: true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF');
(function (ff) {
	"use strict";
	/**
	 * the Events object store.
	 * @type {Object}
	 */
	var E = {},
	/**
	 * the Events registry, where we keep all our registered custom events.
	 * @type {Object}
	 */
		Registry = {
			"GET_DATA" : 'onGetData',
			"GOT_DATA" : 'onGotData'
		},
		/**
		 * the Events object - contains our methods for adding, removing, subscribing to and publishing custom framework events.
		 * @type {Object}
		 */
		Events = {
			/**
			 * Subscribe an object to some events. Pass this function a FractalJS object with methods that
			 * match methods in the registry and they will be added as event listeners to the events system.
			 * @param  {Object} Object	this is the FractalJS object you wish to listen to specific events.
			 * @return {null}			Does not return anything.
			 */
			subscribe : function (Object) {
				var customEvent;
				for (customEvent in Registry) {
					if (Registry.hasOwnProperty(customEvent)) {
						if (typeof Object[Registry[customEvent]] === "function") {
							if (!E[customEvent]) {
								E[customEvent] = [];
							}
							E[customEvent].push({
								id : Object.id,
								fn : Object[Registry[customEvent]]
							});
						}
					}
				}
			},
			/**
			 * Allows us to manually remove an object's event listeners, for instance if
			 * we destroy an object.
			 * @param  {Object} Object	the FractalJS object we want to remove from the events system
			 * listener list.
			 * @return {null}			Does not return anything.
			 */
			unsubscribe : function (Object) {
				var customEvent,
					l;
				for (customEvent in E) {
					if (E.hasOwnProperty(customEvent)) {
						l = E[customEvent].length;
						while (l--) {
							if (E[customEvent][l].id === Object.id) {
								E[customEvent].splice(l, 1);
							}
						}
					}
				}
			},
			/**
			 * This publishes an event.
			 * @param  {string} eventKey	The key for the event we would like to publish
			 * @return {array | object}		an optional argument or array of arguments.
			 */
			publish : function (eventKey, parameters) {
				var functions,
					l,
					x;
				if (Registry[eventKey]) {
					functions = E[eventKey];
					if (functions) {
						l = functions.length;
						for (x = 0; x < l; x++) {
							functions[x].fn(parameters || null);
						}
					}
				}
			},
			/**
			 * Adds events to registry. Takes an event object consisting of one or more events key value pairs, for example:
			 * {
			 *    "EVENT_FOO" : "onFoo"
			 * }
			 * @param {[type]} eventKeys [description]
			 */
			add : function (eventKeys) {
				var customEvent;
				for (customEvent in eventKeys) {
					if (eventKeys.hasOwnProperty(customEvent)) {
						Registry[customEvent] = eventKeys[customEvent];
					}
				}
			},
			/**
			 * Test to see if we have an event key for the specified event
			 * @param {string} key the key to test for.
			 * @return {Boolean} returns true or false.
			 */
			hasEvent : function (key) {
				return (Registry[key]) ? true : false;
			},
			remove : function () {

			}
		};
	ff.Events = Events;
}(FF));