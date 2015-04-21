define("base/block",["wf"],function(_require,exports,module){
    var $ = require("wf");

    $(document).on("change", ".h-p", function(){
        document.execCommand('formatBlock', false, '<' + this.value + '>');
    });

    return {
        group: "font",
        title: "标题和段落",
        role: "block",
        icon: '<select class="h-p">'+
            '<option value="h1">H1</option>'+
            '<option value="h2">H2</option>'+
            '<option value="h3">H3</option>'+
            '<option value="h4">H4</option>'+
            '<option value="h5">H5</option>'+
            '<option value="h6">H6</option>'+
            '<option value="P">p</option>'+
        '</select>'
    };
});