
require("../styles/style.css");
var $ = require("jquery");

/**
 * a和b绑定在index文件中，但是文件中的console没有执行，只是单纯的包含
 */
require.include("a");
require.include("b");

/**
 * c和d绑定在单独文件中，但是c没有执行，d执行了
 * 代码执行相当于
   require.ensure([], function(require) {
        require.include("c");
        require("d");
    });
 * 
 */
require.ensure("c",function(require){
    require("d");
});

var e = require("imports?this=>global!./e");
console.log(e);
$(function() {

    var page1 = require("html!../page1.html");
    $('#content').html(page1);
    var i = 1;
    $('li').click(function() {
        
        var num = $(this).attr("data");
        var pageContent = require("html!../page" + num + ".html");
        $('#content').html(pageContent);
         if (num == 1) {
            console.log(window.appConfig);
        }
        if (num == 2) {
    		 require.ensure([],function(require){
    		 		 require('page2');
                     i++;
                     console.log("执行require.ensure" + "i=" +  i);
    		 });
        }

    })

})
