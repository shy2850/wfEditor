define("ext/image/index",["wf","util/popup/index","util/requestAFrame"],function(_require,exports,module){
    var src = require.toUrl("ext/image/index") + ".html"; 

    var $ = require("wf"),
        Popup = require("util/popup/index"),
        R = require("util/requestAFrame");

    var uploader = null,
        html = '<iframe src="'+src+'" frameborder="0" style="width:100%; height:300px;" id="iframe-image" name="iframe-image"></iframe>',
        dialog;

    $("#editor").on("dblclick","img", function(){
        if( $(this).hasClass('no-allowto-edit') ){
            // 这个东东为了防止以后添加img类型的复杂预览插件也被当作普通img修改。
            return;
        }
        var s = window.getSelection(),
            range = document.createRange();
        if(s.rangeCount > 0) s.removeAllRanges();
        range.selectNode(this);
        s.addRange(range);

        if( !dialog ){
            dialog = Popup.dialog(html, "插入图片", function(r){
                if(r){  //点击确定按钮
                    var img = $( ".active .img-view", $("#iframe-image")[0].contentDocument );
                    img.length && document.execCommand("InsertHtml", false, '<img src="'+img.attr("src")+'" alt="'+img.attr("alt")+'" url="'+img.attr("url")+'"/>' );
                }
            });
        }
        dialog.open();

        var img = this;
        //首次编辑前，需要等待渲染完成。
        R.addTimeout("editImage", function(){
            var editImage = $("#iframe-image")[0].contentWindow.editImage;
            if( typeof editImage === "function" ){
                editImage( img );
                return !1;
            }
        });

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
                        img.length && document.execCommand("InsertHtml", false, '<img src="'+img.attr("src")+'" alt="'+img.attr("alt")+'" url="'+img.attr("url")+'"/>' );
                    }
                });
            }
            dialog.open();
        }
    };
});