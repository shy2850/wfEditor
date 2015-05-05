define("base/controls",["wf"],function(_require,exports,module){
    var $ = require("wf");

    var editor = $("#editor"), 
        code = $("#code"),
        editControls = $("#editControls");

    var i = function(t){
        return '<i class="fa fa-'+t+'"></i>';
    };
    var controls = {
    };

    editControls.on("click", ".btn", function(e){
        var t = $(this),
            r = t.data("role"),
            p = t.parent(),
            g = p.data("group"),
            behavir;
        if( behavir = controls[g][r].behavir ){
            behavir.call( controls[g][r] );
        }else{
            document.execCommand(r, false, null);
        }
    });

    var Controls = function(){
    };

    $.extend( Controls.prototype, {
        init: function(){
            var html = '';
            for(var g in controls){
                var gHtml = '<div class="btn-group" data-group="'+g+'">';
                for(var r in controls[g]){
                    var icon = controls[g][r].icon || (controls[g][r].icon = r); // icon默认跟 role相同
                    controls[g][r].role = controls[g][r].role || r;     // role 可以接收来自于上级key
                    gHtml += '<a class="btn" data-role="'+r+'" href="javascript:;" title="'+(controls[g][r].title||"")+'">'+ ( icon.match(/[<>]/) ? icon : i(icon) ) +'</a>'
                }
                html += gHtml + '</div>';
            }
            editControls.html( html );
        },
        setControls: function(ctls){
            controls = $.extend(controls, ctls);
        },
        addIcon: function(con, group) {
            var t = this,
                callee = this.addIcon;
            if( $.isArray(con) ){
                con.forEach(function(c){
                    callee.call( t, c );
                });
                return ;
            }else{
                group = group || con.group || "other"
                controls[group] = controls[group] || {};
                controls[group][con.role] = con;
            }
        },
        removeGroup: function(group){
            delete controls[group]
        }
    } );

    return Controls;
});