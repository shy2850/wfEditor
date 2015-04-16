define("ext/link",[],function(_require,exports,module){
    return [{
        group: "link",
        title: "链接",
        role: "link",
        behavir: function(el){
            document.execCommand('CreateLink', false, window.prompt("link:","http://") );
        }
    },{
        group: "link",
        title: "取消链接",
        role: "unlink"
    }];
});