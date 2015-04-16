define("ext/color",["wf"],function(_require,exports,module){
    var $ = require("wf");
    var color = "#000";

    return {
        group: "font",
        title: "字体颜色",
        role: "font",
        icon: '<i class="fa fa-font"><input type="color" class="bg opacity"/></i>',
        behavir: function(el, off){
            el.find("input").on("change",function(){
                el.css({
                    color: this.value
                });
                document.execCommand('ForeColor', false, this.value);
            });
        }
    };
});