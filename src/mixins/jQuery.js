/**
 * @author scottvanlooy
 */
FF.reqNameSpace('FF.mixins');
FF.mixins.UI = function(object){
	var OBJMIXINS = {
		open:function(callback){
			var that = that || this;
			that.domNode.fadeIn(function(){
				return (callback) ? callback() : null;
			});
		},
		close:function(callback){
			var that = that || this;
			that.domNode.fadeOut(function(){
				that.domNode.hide();
				return (callback) ? callback() : null;
			});
		},
		on:function(){
			var that = that || this;
			that.domNode.show();
		},
		off:function(){
			var that = that || this;
			that.domNode.show();
		}
	};
	var UIMIXINS = {
	};
	for(var i in OBJMIXINS){
		object[i] = OBJMIXINS[i];
	}
	for(i in UIMIXINS){
		object[i] = UIMIXINS[i];
	}
};