/*
 * 	Easy Code Prettify 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog 
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($){
	var s = $.easyCodePrettify = function(target, option){
		var o = this, c = o.config = $.extend({}, s.defaults, option);
		c.target = $(target);
//		var reg = RegExp('^(' + c.demoText + '|' + c.codeText + ')$');
		var codeSection = c.target.find(c.codeNode).filter(function(){
			return RegExp(c.demoText + '|' + c.codeText).test($(this).text());
		});
		codeSection.each(function(){
			var t = $(this);
			var code = [];
			(function(t){
				var callee = arguments.callee;
				var next = t.next();
				if(t.size() && next.size()){
					if(t.prop('tagName') == c.codeTypeNode && next.prop('tagName') == 'PRE'){
						next.attr('data-ex-code-prettify-param', '{codeType:"' + t.text() + '"}');
						t.remove();
						code.push(next[0]);
						callee(next.next());
					}
				}
			})(t.next());
			if(code.length) {
				$(code).wrapAll('<div class="ex-code-prettify"/>').exCodePrettify({
					showDemo: RegExp(c.demoText).test(t.text()),
					showCode: RegExp(c.codeText).test(t.text()),
					editCode: RegExp(c.editText).test(t.text())
				});
				t.remove();
			}
		});
		c.target.find('> pre').each(function(){
			var t = $(this), prev = t.prev();
			var opt = {};
			if(prev.prop('tagName') == c.codeTypeNode){
				opt = {codeType : prev.text()}
				prev.remove();
			}
			t.wrap('<div class="ex-code-prettify"/>').exCodePrettify(opt);
		});
	}
	$.fn.easyCodePrettify = function(option){
		return this.each(function(){
			$(this).data(s.id, new $.easyCodePrettify(this, option));
		});
	}
	$.extend(s, {
		defaults : {
			codeNode : 'H4',
			codeTypeNode : 'H5',
			demoText : 'demo',
			codeText : 'code',
			editText : 'edit'
		},
		id : 'easy-code-prettify'
	});
})(jQuery);
