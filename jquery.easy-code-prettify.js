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
		var codeSection = c.target.find(c.codeNode).filter(function(){
			return RegExp(c.demoText + '|' + c.codeText).test($(this).text());
		});
		codeSection.each(function(){
			var t = $(this);
			var noAuto = RegExp(c.noAutoText).test(t.text());
			var noReset = RegExp(c.noResetText).test(t.text());
			var code = [];
			(function(t){
				var callee = arguments.callee;
				var next = t.next();
				if(t.size() && next.size()){
					if(t.prop('tagName') == c.codeTypeNode && next.prop('tagName') == 'PRE'){
//						var codeType = t.text();


						var codeType = (t.text()+' ').match(/script |html |css |cssFile |jsFile /).toString().trim();
						var autoRun = (codeType == 'script' && noAuto ? ',autoRun:false' : '');
						var showCode = (t.text()+' ').match(/noCode /) == 'noCode ' ? ',showCode:false' : '';
						next.attr('data-ex-code-prettify-param', '{codeType:"' + codeType + '"'+autoRun + showCode +'}');
						t.remove();
						code.push(next[0]);
						callee(next.next());
					}
				}
			})(t.next());
			if(code.length) {
				var opt = $.extend({
					showDemo: RegExp(c.demoText).test(t.text()),
					showCode: RegExp(c.codeText).test(t.text()),
					editCode: RegExp(c.editText).test(t.text())
				}, (noAuto ? {
					showRunButton : true,
					showResetButton : !noReset
				} : {}));
				$(code).wrapAll('<div class="ex-code-prettify"/>').exCodePrettify(opt);
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
			codeNode : 'H4',	// グルーピングを指定する要素
			codeTypeNode : 'H5',	// コード種別を指定する要素
			demoText : 'demo',	// コード実行の判定テキスト
			codeText : 'code',	// コード表示の判定テキスト
			editText : 'edit',	// コード編集の判定テキスト
			noAutoText : 'noAuto',	// 自動実行の判定テキスト
			noResetText : 'noReset'	// リセットボタン表示判定テキスト
		},
		id : 'easy-code-prettify'
	});
})(jQuery);
