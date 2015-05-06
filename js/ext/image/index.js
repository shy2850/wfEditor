define("ext/image/index",["wf","util/popup/index"],function(_require,exports,module){
    var src = require.toUrl("ext/image/index") + ".html"; 

    var $ = require("wf"),
        Popup = require("util/popup/index");

    var uploader = null,
        html = '<iframe src="'+src+'" frameborder="0" style="width:100%; height:300px;" id="iframe-image" name="iframe-image"></iframe>',
        dialog;

    $("#editor").on("dblclick","img", function(){
        if( !dialog ){
            dialog = Popup.dialog(html, "插入图片", function(r){
                if(r){  //点击确定按钮
                    var img = $( ".active .img-view", $("#iframe-image")[0].contentDocument );
                    img.length && document.execCommand("InsertHtml", false, img.parent().html() );
                }
            });
        }
        dialog.open();
    });

    return {
        group: "other",
        title: "插入图片",
        role: "image",
        behavir: function(){
            if( !dialog ){
                dialog = Popup.dialog(html, "插入图片", function(r){
                    if(r){  //点击确定按钮
                        var img = $( ".active .img-view", $("#iframe-image")[0].contentDocument );
                        img.length && document.execCommand("InsertHtml", false, img.parent().html() );
                    }
                });
            }
            dialog.open();
        }
    };
});