
require("../styles/style.css");
var $ = require("jquery");

$(function() {
    var page1 = require("html!../page1.html");
    $('#content').html(page1);
    $('li').click(function() {
        var num = $(this).attr("data");
        var pageContent = require("html!../page" + num + ".html");
        $('#content').html(pageContent);
        if (num == 2) {
    		 require.ensure([],function(require){
    		 		 require('page2');
    		 });
        }

    })

})
