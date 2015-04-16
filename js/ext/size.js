define("ext/size",[],function(_require,exports,module){
    return {
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
        behavir: function(el, off){
            el.find("select").on("change",function(){
                document.execCommand('FontSize', false, this.value);
            });
        }
    };
});