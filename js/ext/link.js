define("ext/link",["wf","util/popup/index"],function(_require,exports,module){

    var $ = require("wf"),
        Popup = require("util/popup/index"),
        R = require("util/requestAFrame");

    var uploader = null,
        html = ''
            +'<div class="form-group">'
            +'    <div class="input-group">'
            +'        <div class="input-group-addon">文字</div>'
            +'        <input type="txt" class="form-control link-text" {{readonly}} value="{{text}}">'
            +'    </div>'
            +'</div>'
            +'<div class="form-group">'
            +'    <div class="input-group">'
            +'        <div class="input-group-addon">链接</div>'
            +'        <input type="txt" class="form-control link-href" value="{{link}}">'
            +'    </div>'
            +'</div>'
            +'<div class="checkbox">'
            +'    <label>'
            +'        <input type="checkbox" {{checked}} class="link-target"> 新窗口打开'
            +'    </label>'
            +'</div>';

    $("#editor").on("dblclick","a", function(){

        var o = {
            text: this.innerHTML,
            link: this.href,
            checked: this.target ? "checked" : "",
            readonly: "readonly"
        }, a = this;

        var s = window.getSelection(),
            range = document.createRange();
        if(s.rangeCount > 0) s.removeAllRanges();
        range.selectNode(a);
        s.addRange(range);
        Popup.confirm(html.replace(/\{\{(\w+)\}\}/g, function(wd,k){return o[k]}), "编辑链接", function(r){
            if(r){
                var href = $(this).find(".link-href").val(),
                    target = $(this).find(".link-target")[0].checked ? '_blank' : "";
                if( href ){
                    a.href = href;
                    a.target = target;
                }else{
                    alert( "请输入链接" );
                    return false;
                }
            }
        }, {width: 400});

    });


    return [{
        group: "link",
        title: "链接",
        role: "link",
        behavir: function(el){
            var link = window.prompt("link:","");
            if(link){
                document.execCommand('CreateLink', false, link);
                getSelection().anchorNode.parentNode.target = "_blank";
            }
        }
    },{
        group: "link",
        title: "取消链接",
        role: "unlink"
    }];
});