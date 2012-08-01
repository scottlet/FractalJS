/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, jQuery:false, window:false*/

/**
 * @author Scott van Looy
 */
FF.reqNameSpace('FF.core.uis');
(function (uis) {
	"use strict";
	/** PRIVATE METHODS **/
	var BaseUI = FF.augmentObject({});

	/** API METHODS **/
	BaseUI.setRootDomNode = function (domNode) {
		BaseUI.root = (domNode.jquery) ? domNode : $(domNode);
	};
	/**
	 * setupUI - sets up a UI, caches its domnode and prepares it for use.
	 * @param {string|object} id - the dom ID, className or jQuery object of the root element for the UI.
	 */
	BaseUI.setupUI = function (id) {
		if (!FF.mixins.UI) {
			FF.requires(['core.mixins.Native']);
		}
		FF.mixins.UI(this);
		if (!window.jQuery) {
			this.domNode = FF.mixins.Selector(id);
		} else {
			if (id.jquery) {
				this.domNode = id;
			} else {
				this.domNode = $(id);
			}
		}
		this.contentNode = this.domNode.find('.content');
		this.headerNode = this.domNode.find('.title');
		this.templateNode = this.domNode.find('.template').remove();
		this.footerNode = this.domNode.find('.footer');
	};
	BaseUI.setView = function (view) {
		this.view = view;
	};
	/**
	 * createUI - takes an object and extends it with the BaseUI
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseUI.createUI = BaseUI.extend.curry(undefined, BaseUI);
	uis.BaseUI = BaseUI;
}(FF.core.uis));

