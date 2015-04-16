define("ext/font",[],function(_require,exports,module){
    return {
        group: "font",
        title: "字体",
        role: "font",
        icon: '<select>'+
            '<option value="SimSun,宋体">宋体</option>'+
            '<option value="Microsoft YaHei,微软雅黑">微软雅黑</option>'+
            '<option value="SimHei,黑体">黑体</option>'+
            '<option value="Arial" selected>Arial</option>'+
            '<option value="LiSu,隶属">隶属</option>'+
            '<option value="KaiTi,楷体">楷体</option>'+
            '<option value="times new roman,新罗马">新罗马</option>'+
            '<option value="impact,chicago">impact</option>'+
        '</select>',
        behavir: function(el, off){
            el.find("select").on("change click",function(){
                document.execCommand('FontName', false, this.value);
            });
        }
    };
});