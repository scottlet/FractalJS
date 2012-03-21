/**
 * Copyright (c) 2011-2012, Scott van Looy, ThreeSquared.
 * All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of ThreeSquared nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL SCOTT VAN LOOY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @author Scott van Looy
 */
J$.reqNameSpace('J$.uis');
J$.uis.BaseUI = (function(){
	/** PRIVATE METHODS **/
	var that=this;
	var init = function(){
		
	};
	/** API METHODS **/
	return {
		setRootDomNode : function(domNode){
			that.root = (domNode.jquery)?domNode:$(domNode);
		},
		/**
		 * setupUI - sets up a UI, caches its domnode and prepares it for use.
		 * @param {string|object} id - the dom ID or jQuery object of the root element for the UI.
		 */
		setupUI : function(id){
			this.domNode = (id.jquery)?id:$(id);
			this.contentNode = this.domNode.find('.content');
			this.headerNode = this.domNode.find('.title');
			this.templateNode = this.domNode.find('.template').remove();
			this.footerNode = this.domNode.find('.footer');
			J$.mixins.UI(this);
		},
		setView : function(view){
			this.view=view;
		}
	};
})();
