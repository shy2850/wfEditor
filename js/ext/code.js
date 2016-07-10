define("ext/code",["wf"],function(_require,exports,module){
    var $ = require("wf");

    var editor = $("#editor"),
        code = $("#code"),
        code_mirror,
        markdown = $('<textarea id="markdown" style="display:none;"></textarea>'),
        md_mirror,
        Beautify,
        Marked,
        reMarker;

    code.after( markdown ); // markdown 编辑器

    $(window).on("resize", function(){
        $(".CodeMirror").css( {
            height: code.css("height")
        } );
    });

    $( "#editparent" ).on("keyup", ".CodeMirror", function(e){
        if( e.keyCode === 9 && !window.emmet ) require(["emmet.min"]);
    });

    return [{
        group: "html",
        icon: '<span>MD</span>',
        role: 'markdown',
        title: "☆markdown编辑器\n 1.支持HTML转markdown\n 2.支持markdown转HTML\n 3.支持高亮展示\n 4.切换原编辑器保存",
        behavir: function(){
            var mirr = markdown.next().filter(".CodeMirror"),
                hidden = mirr.hasClass("hidden");

            $(".CodeMirror").addClass( "hidden" );
            
            if( mirr.length && hidden ){
                md_mirror.setValue( reMarker.render( editor.html() ) );
                mirr.removeClass( "hidden" );
            }else if( mirr.length ){
                editor.html( Marked( md_mirror.getValue() ) );
            }else if( !mirr.length ){
                require([
                    "../node_modules/js-beautify/js/index",
                    "../node_modules/codemirror/lib/codemirror",
                    "marked",
                    "../node_modules/codemirror/mode/markdown/markdown",
                    "remarked",
                    "../node_modules/codemirror/keymap/sublime",
                    "css!../node_modules/codemirror/lib/codemirror.css",
                    "css!../node_modules/codemirror/theme/monokai.css"
                ], function(_Beautify, CodeMirror, _Marked){
                    Beautify = _Beautify;
                    Marked = _Marked;
                    window.CodeMirror = CodeMirror;
                    md_mirror = CodeMirror.fromTextArea(markdown[0], {
                        value: editor.html(),
                        lineNumbers: true,
                        mode: "markdown",
                        keyMap: "sublime",
                        extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        smartIndent: true,
                        showCursorWhenSelecting: true,
                        theme: "monokai"
                    });

                    reMarker = new reMarked({
                        indnt_str: "  "
                    });

                    md_mirror.setValue( reMarker.render( editor.html() ) );
                    $(window).trigger("resize");
                });
            }
        }
    },{
        group: "html",
        icon: '<span>HTML</span>',
        role: 'code',
        title: " ☆sublime编辑\n 1.支持CodeMirror\n 2.支持HTML格式化\n 3.支持sublime[Shift-Alt-↑↓:selectLines]\n 4.支持完整emmet\n 5.切换原编辑器保存",
        behavir: function(){    // behavior 是 具体操作
            var mirr = code.next().filter(".CodeMirror"),
                hidden = mirr.hasClass("hidden");

            $(".CodeMirror").addClass( "hidden" );
            
            if( mirr.length && hidden ){
                code_mirror.setValue( Beautify.html( editor.html() ) );
                mirr.removeClass( "hidden" );
            }else if( mirr.length ){
                editor.html( code_mirror.getValue() );
            }else if( !mirr.length ){
                require([
                    "../node_modules/js-beautify/js/index",
                    "../node_modules/codemirror/lib/codemirror",
                    "../node_modules/codemirror/mode/htmlmixed/htmlmixed",
                    "../node_modules/codemirror/keymap/sublime",
                    "css!../node_modules/codemirror/lib/codemirror.css",
                    "css!../node_modules/codemirror/theme/monokai.css"
                ], function(_Beautify, CodeMirror){
                    Beautify = _Beautify;
                    window.CodeMirror = CodeMirror;
                    code_mirror = CodeMirror.fromTextArea(code[0], {
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
                    code_mirror.setValue( Beautify.html( editor.html() ) );
                    $(window).trigger("resize");
                });
            }

        }
    }];
});