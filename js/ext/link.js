define("ext/link",["wf","util/popup/index"],function(_require,exports,module){

    var $ = require("wf"),
        Popup = require("util/popup/index");

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
            +'        <input type="url" class="form-control link-href" value="{{link}}" placeholder="http://">'
            +'    </div>'
            +'</div>'
            +'<div class="checkbox">'
            +'    <label>'
            +'        <input type="checkbox" {{checked}} class="link-target"> 新窗口打开'
            +'    </label>'
            +'</div>';

    $("#editor").on("click","a", function(){

        var o = {
            text: this.innerHTML,
            link: this.href,
            checked: this.target ? "checked" : ""
        }, a = this;

        var s = window.getSelection(),
            range = document.createRange();
        if(s.rangeCount > 0) s.removeAllRanges();
        range.selectNode(a);
        s.addRange(range);
        Popup.confirm(html.replace(/\{\{(\w+)\}\}/g, function(wd,k){return o[k]||""}), "编辑链接", function(r){
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
            var s = getSelection(),
                range = s.getRangeAt(0),
                o = {};
            if( s.extentNode === s.baseNode ){
                o.text = s.toString();
                Popup.confirm(html.replace(/\{\{(\w+)\}\}/g, function(wd,k){return o[k]||""}), "新建链接", function(r){
                    if(r){
                        var text = $(this).find(".link-text").val(),
                            href = $(this).find(".link-href").val(),
                            target = $(this).find(".link-target")[0].checked ? '_blank' : "";
                        if( text && href ){
                            getSelection().addRange( range );
                            document.execCommand("InsertHtml", false, '<a href="'+href+'" target="'+target+'">'+text+'</a>' );
                        }else{
                            alert( "请输入文字和链接" );
                            return false;
                        }
                    }
                }, {width: 400});
            }
        }
    },{
        group: "link",
        title: "取消链接",
        role: "unlink"
    }];
});