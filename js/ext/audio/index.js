define("ext/audio/index",["wf","util/popup/index","util/requestAFrame"],function(_require,exports,module){
    var src = require.toUrl("ext/audio/index") + ".html"; 

    var $ = require("wf"),
        Popup = require("util/popup/index"),
        R = require("util/requestAFrame");

    var uploader = null,
        html = '<iframe src="'+src+'" frameborder="0" style="width:100%; height:300px;" id="iframe-music" name="iframe-music"></iframe>',
        dialog;

    $("#editor").on("dblclick","audio", function(){
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
            dialog = Popup.dialog(html, "插入音乐", function(r){
                if(r){  //点击确定按钮
                    var audio = $( ".active .audio-view", $("#iframe-music")[0].contentDocument );
                    audio.length && document.execCommand("InsertHtml", false,
                        '<audio src="'+audio.attr("src")+'" title="'+audio.attr("title")+'" controls/>' );
                }
            });
        }
        dialog.open();

        var audio = this;
        //首次编辑前，需要等待渲染完成。
        R.addTimeout("editMusic", function(){
            var editMusic = $("#iframe-music")[0].contentWindow.editMusic;
            if( typeof editMusic === "function" ){
                editMusic( audio );
                return !1;
            }
        });

    });

    return {
        group: "other",
        title: "插入音乐",
        role: "music",
        behavir: function(){
            if( !dialog ){
                dialog = Popup.dialog(html, "插入音乐", function(r){
                    if(r){  //点击确定按钮
                        var audio = $( ".active .audio-view", $("#iframe-music")[0].contentDocument );
                        audio.length && document.execCommand("InsertHtml", false,
                            '<audio src="'+audio.attr("src")+'" title="'+audio.attr("title")+'" controls/>' );
                    }
                });
            }
            dialog.open();
        }
    };
});