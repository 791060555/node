require("!style!css!../styles/style.css");
var $ = require("jquery");
// require("./style.css");
// document.write(require("./content.js"));

$(function() {
	var page1 = require("html!../page1.html");
	$('#content').html(page1);
	$('li').click(function() {
		var num = $(this).attr("data");
		var pageContent = require("html!../page" + num + ".html");
		$('#content').html(pageContent);
	})

})