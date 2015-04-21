define("ext/image",["wf","util/popup","util/frameUpload/index"],function(_require,exports,module){

    var $ = require("wf"),
        Popup = require("util/popup"),
        FrameUpload = require("util/frameUpload/index");

    var html = '<div class="ui-confirm clearfix">'
                +'<h1 class="ui-confirm-title">插入图片</h1>'
                +'<div class="ui-confirm-info">'
                +'<p><button type="button" class="btn btn-info image-upload">上传图片</button></p>'
                +'<p><input type="text" class="form-control image-input" placeholder="或直接粘贴图片地址"/></p>'
                +'</div>'
                +'<p class="clearfix">'
                +'<a href="javascript:void(0);" class="ui-confirm-cancel popup-close btn btn-default">取 消</a>'
                +'<a href="javascript:void(0);" class="ui-confirm-submit btn btn-primary">确 定</a>'
                +'</p>'
            +'</div>';
    var dialog = Popup({
            beforeOpen:function(){},
            afterOpen:function(){},
            beforeClose:function(){},
            autoOpen: false,
            close : true,       //显示关闭按钮
            removeOnClose : false,   //关闭时移除DOM
            blurToClose : false,  //是否支持点击半透明层关闭弹框
            width: 300,
            html : html
        }),
        imgBtn = dialog.find(".image-upload"),
        imgInput = dialog.find(".image-input");
    var uploader = null,
        selection = null;

    dialog.on('click','.ui-confirm-submit',function(e){
        var imgUrl;
        if( ( imgUrl = imgInput.val() ) ){
            selection.focusNode.after( '<img src="'+imgUrl+'" alt="'+imgUrl+'" />' );
        }
        dialog.close();        
    });

    return {
        group: "other",
        title: "插入图片",
        role: "image",
        behavir: function(sele){
            selection = sele;
            dialog.open();

            if( !uploader ){
                uploader = new FrameUpload({
                    el: imgBtn[0],
                    action: "/f2e/imageUpload.html?uploadUrl=/f2e/upload/",
                    onchange: function(){
                        this.submit();
                        imgBtn.html("图片上传中");
                    },
                    afterUpload: function(data){
                        imgBtn.html("上传图片");
                        dialog.close();
                        document.execCommand('InsertImage', false, data.imgUrl);
                    }
                });
            }
        }
    };
});