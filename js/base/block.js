define("base/block",["wf"],function(_require,exports,module){
    var $ = require("wf");

    $(document).on("change", ".h-p", function(){
        document.execCommand('formatBlock', false, '<' + this.value + '>');
    });

    $("#editor").on("click", function(e){
        var m = $(".h-p"), 
            tar = $(e.target).filter("h1,h2,h3,h4,h5,h6,p,div")[0] || $(e.target).parents("h1,h2,h3,h4,h5,h6,p,div")[0] || document.createElement("p"), 
            tag = tar.tagName.toLowerCase();
        m.val( tag );
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
            '<option value="p">p</option>'+
            '<option value="div">div</option>'+
        '</select>'
    };
});