/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * @author Scott van Looy
 */
FF.reqNameSpace('FF.uis');
(function (uis) {
	/** PRIVATE METHODS **/
	var BaseUI = this;

	/** API METHODS **/
	BaseUI.setRootDomNode = function (domNode) {
		BaseUI.root = (domNode.jquery) ? domNode : $(domNode);
	};
	/**
	 * setupUI - sets up a UI, caches its domnode and prepares it for use.
	 * @param {string|object} id - the dom ID or jQuery object of the root element for the UI.
	 */
	BaseUI.setupUI = function (id) {
		this.domNode = (id.jquery) ? id : $(id);
		this.contentNode = this.domNode.find('.content');
		this.headerNode = this.domNode.find('.title');
		this.templateNode = this.domNode.find('.template').remove();
		this.footerNode = this.domNode.find('.footer');
		FF.mixins.UI(this);
	};
	BaseUI.setView = function (view) {
		this.view = view;
	};
	uis.BaseUI = BaseUI;
}(FF.uis));

