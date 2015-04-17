define("ext/image",[],function(_require,exports,module){
    return [{
        group: "other",
        title: "链接",
        role: "link",
        behavir: function(el){
            document.execCommand('InsertHtml', false, window.prompt("link:","http://") );
        }
    },{
        group: "link",
        title: "取消链接",
        role: "unlink"
    }];
});