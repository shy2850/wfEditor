define("ext/face",["wf"],function(_require,exports,module){
    var $ = require("wf");

    $(document).on("mouseover", ".fa-meh-o", function(){  //颜色
        var emos = $(this).next();
        if( !emos.length ){
           $(this).after( $('<div class="emos" style="position:absolute; right:0; top: 30px;">xxx</div>') ); 
        }
        $(this).next().show();
    }).on("mouseout", ".emos", function(){
        $(this).hide();
    });

    return [{
        group: "face",
        title: "插入表情",
        role: "meh-o"
    }];
});