define("ext/font",[],function(_require,exports,module){
    return [{
        group: "font",
        title: "字体颜色",
        role: "color",
        icon: '<i class="fa fa-font"><input type="color" class="bg opacity"/></i>',
        behavir: function(el){
            el.find("input").on("change click",function(){
                document.execCommand('ForeColor', false, this.value);
            });
        }
    },{
        group: "font",
        title: "背景颜色",
        role: "bgcolor",
        icon: '<i class="fa fa-paint-brush"><input type="color" class="bg opacity"/></i>',
        behavir: function(el){
            el.find("input").on("change click",function(){
                document.execCommand('BackColor', false, this.value);
            });
        }
    },{
        group: "font",
        title: "字体大小",
        role: "size",
        icon: '<select>'+
            '<option value="7">一号</option>'+
            '<option value="6">二号</option>'+
            '<option value="5">三号</option>'+
            '<option value="4">四号</option>'+
            '<option value="3">五号</option>'+
            '<option value="2">六号</option>'+
            '<option value="1">七号</option>'+
        '</select>',
        behavir: function(el){
            el.find("select").on("change",function(){
                document.execCommand('FontSize', false, this.value);
            });
        }
    },{
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
        behavir: function(el){
            el.find("select").on("change click",function(){
                document.execCommand('FontName', false, this.value);
            });
        }
    }];
});