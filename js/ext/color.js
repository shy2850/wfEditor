define("ext/color",[],function(_require,exports,module){
    return {
        group: "font",
        title: "字体颜色",
        role: "color",
        icon: '<i class="fa fa-font"><input type="color" class="bg opacity"/></i>',
        behavir: function(el, off){
            el.find("input").on("change click",function(){
                document.execCommand('ForeColor', false, this.value);
            });
        }
    };
});