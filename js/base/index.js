define("base/index",["wf","base/controls"],function(_require,exports,module){
    var $ = require("wf"),
        Controls = require("base/controls");

    var editor = $("#editor"), 
        code = $("#code"),
        editControls = $("#editControls");
    
    var controls = new Controls(),
        allControls = {
            html:{
                code: {
                    icon: '<span>HTML</span>',
                    title: "查看源代码",
                    behavir: function(){    // behavior 是 具体操作
                        code.toggle().val( editor.toggle().html() );
                    }
                }
            },
            undo: {
                undo: {
                    title: "撤销"
                },   //icon默认和 key相同
                redo:{
                    title: "重做",
                    icon: "repeat"
                }
            },
            font: {
                bold: {
                    title: "加粗"
                },
                italic: {
                    title: "斜体"
                },
                underline: {
                    title: "下划线"
                },
                strikeThrough: {
                    title: "删除线",
                    icon: "strikethrough"
                }
            },
            justify: {
                justifyLeft: {
                    title: "居左对齐",
                    icon: "align-left"
                },
                justifyCenter: {
                    title: "居右对齐",
                    icon: "align-center"
                },
                justifyRight: {
                    title: "居中对齐",
                    icon: "align-right"
                },
                justifyFull: {
                    title: "两端对齐",
                    icon: "align-justify"
                }
            },
            indent: {
                indent: {
                    title: "缩进"
                },
                outdent: {
                    title: "取消缩进"
                },
                insertUnorderedList: {
                    title: "无序列表",
                    icon: "list-ul"
                },
                insertOrderedList: {
                    title: "有序列表",
                    icon: "list-ol"
                }
            },
            link:{},
            other: {
                removeFormat:{
                    title: "清除格式",
                    icon: "eraser"
                }
            }
        };
    controls.setControls(allControls);

    /*加载扩展插件开始*/
    require([
        "base/block",
        "ext/font",
        "ext/link",
        "ext/image/index",
        "ext/code"
    ],function(){
        [].forEach.call(arguments, function(icon){
            controls.addIcon(icon);
        });
        controls.init();
        $(window).trigger("resize");
    });
    /*加载扩展插件结束*/


    $(window).on("resize",function(){
        var h = parseInt( editControls.css("height") ) + 20;
        editor.css({
            height: document.documentElement.clientHeight - h
        });
        code.css({
            height: document.documentElement.clientHeight - h
        });
    }).trigger("resize");
});