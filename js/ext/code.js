define("ext/code",["wf"],function(_require,exports,module){
    var $ = require("wf");

    var editor = $("#editor"),
        code = $("#code"),
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
            if( mirror_show ){
                mirror_show = false;
                mirror && editor.show().html( mirror.getValue() );   
                return; 
            }

            mirror_show = true;
            editor.hide();

            if( mirror ){
                mirror.setValue( editor.html() );
                return;
            }

            require([
                "../node_modules/codemirror/lib/codemirror",
                "../node_modules/codemirror/mode/htmlmixed/htmlmixed",
                "../node_modules/codemirror/keymap/sublime",
                "css!../node_modules/codemirror/lib/codemirror.css",
                "css!../node_modules/codemirror/theme/monokai.css"
            ], function(CodeMirror){
                console.log( editor.html() );
                mirror = CodeMirror.fromTextArea(code[0], {
                    value: editor.html(),
                    lineNumbers: true,
                    mode: "javascript",
                    keyMap: "sublime",
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    theme: "monokai"
                });
                mirror.setValue( editor.html() );
                $(window).trigger("resize");
            });
        }
    }];
});