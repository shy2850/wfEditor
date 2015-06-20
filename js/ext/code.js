define("ext/code",["wf"],function(_require,exports,module){
    var $ = require("wf");

    var editor = $("#editor"),
        code = $("#code"),
        Beautify,
        mirror,
        mirror_show = false;

    $(window).on("resize", function(){
        $(".CodeMirror").css( {
            height: code.css("height")
        } );
    });

    return [{
        group: "html",
        icon: '<span>HTML</span>',
        role: 'code',
        title: "查看源代码",
        behavir: function(){    // behavior 是 具体操作
            var mirr = $(".CodeMirror");
            if( mirror_show ){
                mirror_show = false;
                if(mirror){
                    editor.show().html( mirror.getValue() ); 
                    mirr.hide();
                }  
                return; 
            }

            mirror_show = true;
            editor.hide();

            if( mirror ){
                mirror.setValue( Beautify.html( editor.html() ) );
                mirr.show();
                return;
            }

            require([
                "../node_modules/js-beautify/js/index",
                "../node_modules/codemirror/lib/codemirror",
                "../node_modules/codemirror/mode/htmlmixed/htmlmixed",
                "../node_modules/codemirror/keymap/sublime",
                "css!../node_modules/codemirror/lib/codemirror.css",
                "css!../node_modules/codemirror/theme/monokai.css"
            ], function(_Beautify, CodeMirror){
                Beautify = _Beautify;
                mirror = CodeMirror.fromTextArea(code[0], {
                    value: editor.html(),
                    lineNumbers: true,
                    mode: "text/html",
                    keyMap: "sublime",
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    smartIndent: true,
                    showCursorWhenSelecting: true,
                    theme: "monokai"
                });
                mirror.setValue( Beautify.html( editor.html() ) );
                $(window).trigger("resize");
            });
        }
    }];
});