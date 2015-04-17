define("ext/font",["wf"],function(_require,exports,module){
    var $ = require("wf");

    $(document).on("change", ".fa-font input", function(){  //颜色
        document.execCommand('ForeColor', false, this.value);
    }).on("change", ".fa-background input", function(){    // 背景
        document.execCommand('BackColor', false, this.value);
    }).on("change", "select.font-size", function(){    // 大小
        var range = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.style.cssText = "font-size:"+ this.value;
        try{
            range.surroundContents(span);
        }catch(e){
            alert( "不要跨标签修改字体大小" );
        }
    }).on("change", "select.font-family", function(){    // 字体
        document.execCommand('FontName', false, this.value);
    });

    return [{
        group: "font",
        title: "字体颜色",
        role: "color",
        icon: '<i class="fa fa-font"><input type="color" class="bg opacity"/></i>'
    },{
        group: "font",
        title: "背景颜色",
        role: "bgcolor",
        icon: '<i class="fa fa-background"><input type="color" class="bg opacity"/></i>'
    },{
        group: "font",
        title: "字体大小",
        role: "size",
        icon: '<select class="font-size">'+
            '<option value="12px">12px</option>'+
            '<option value="13px">13px</option>'+
            '<option value="14px">14px</option>'+
            '<option value="16px" selected>16px</option>'+
            '<option value="20px">20px</option>'+
            '<option value="24px">24px</option>'+
            '<option value="36px">36px</option>'+
            '<option value="48px">48px</option>'+
            '<option value="72px">72px</option>'+
        '</select>'
    },{
        group: "font",
        title: "字体",
        role: "font",
        icon: '<select class="font-family" style="width:76px;">'+
            '<option value="SimSun,宋体">宋体</option>'+
            '<option value="Microsoft YaHei,微软雅黑">微软雅黑</option>'+
            '<option value="SimHei,黑体">黑体</option>'+
            '<option value="LiSu,隶书">隶书</option>'+
            '<option value="KaiTi,楷体">楷体</option>'+
            '<option value="Arial" selected>Arial</option>'+
            '<option value="impact,chicago">Impact</option>'+
            '<option value="times new roman">TimesNewRoman</option>'+
        '</select>'
    }];
});