$(function() {

	// Enable syntax highlighting
	(function (p) {
		var old_getHtml = p.getHtml;
		p.getHtml = function (code) {
			var html = old_getHtml.call(this, code);
			// Inherit from theme web-2.0
			return '<pre class="syntaxhighlighter-container">' + html + '</pre>';
		}
	})(SyntaxHighlighter.Highlighter.prototype);
	SyntaxHighlighter.defaults["gutter"] = false;
	SyntaxHighlighter.defaults["toolbar"] = false;
	SyntaxHighlighter.defaults["quick-code"] = false;
	SyntaxHighlighter.all();

	// Deck initialization
	$.deck('.slide');

});

