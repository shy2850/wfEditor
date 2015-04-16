define("ext/bgcolor",[],function(_require,exports,module){
    return {
        group: "font",
        title: "背景颜色",
        role: "bgcolor",
        icon: '<i class="fa fa-paint-brush"><input type="color" class="bg opacity"/></i>',
        behavir: function(el, off){
            el.find("input").on("change click",function(){
                document.execCommand('BackColor', false, this.value);
            });
        }
    };
});