define("util/popup",["wf"],function(_require,exports,module){
    var $ = require("wf");

    var popup = function(opt){
        var o = $.extend({
            beforeOpen:function(){},
            afterOpen:function(){},
            beforeClose:function(){},
            width : 680,
            autoOpen: true,
            close : true,       //显示关闭按钮
            removeOnClose : true,   //关闭时移除DOM
            blurToClose : true  //是否支持点击半透明层关闭弹框
        },opt);

        var root = $('html'),
            holder = $('<div class="popup" style="display:none;"></div>'),
            close = $('<a href="javascript:void(0);" class="fa fa-remove popup-close"></a>'),
            inner = $('<div class="popup-inner"></div>').css({
                width: o.width
            }),
            roc = o.removeOnClose;

        holder.append( close );
        //点击半透明层关闭
        if( o.blurToClose ){
            holder.on('click',function(e){
                e.target === this && holder.close();
            });
        }
        holder.on('click','.popup-close',function(){
            holder.close();
        });

        //添加当前DOM到holder
        inner.html(opt.html);
        holder.append(inner);
        $(document.body).append( holder );

        holder.open = function(){
            var t = this;
            if( o.beforeOpen.call(t) !== false ){
                root.addClass('popup-overflow');
                $('.popup').not(t).hide();
                t.show();
                o.afterOpen.call(t);
            }
        };

        holder.close = function(handle){
            var t = this;
            if( o.beforeClose.call(t,handle) !== false ){
                roc ? t.remove() : t.hide();
                root.removeClass('popup-overflow');
            }
        };

        //自动打开
        if( o.autoOpen ){
            holder.open();
        }

        return holder;
    };

    // confirm|alert 相关 全局操作
    $(document).on('keyup',function(e){
        if( e.keyCode == 27 ){
            $( '.popup > .popup-close' ).trigger('click');  
        }
    });

    var confirm = function(info, title, confirmLine, callback){
        if( typeof confirmLine === 'function' ){
            callback = confirmLine;
            confirmLine = null;
        }else{
            callback = new Function();
        }
        var html = '<div class="ui-confirm clearfix">'
                +'<h1 class="ui-confirm-title">'+(title||'温馨提示')+'</h1>'
                // +( des ? '<p class="ui-confirm-des">'+des+'</p>' : '' )
                + info 
                +(confirmLine||'<p class="clearfix"><a href="javascript:void(0);" class="ui-confirm-cancel popup-close">取 消</a><a href="javascript:void(0);" class="ui-confirm-submit">确 定</a></p>')
            +'</div>';
        var d = popup({
                close : false,
                width: 300,
                html : html,
                beforeClose : function(handle){
                    var rt = callback.call( d, $(handle).hasClass('ui-confirm-submit') );
                    return handle ? rt : undefined;
                }
            });

        d.on('click','.ui-confirm-submit',function(e){
            d.close( this );            
        });
    };

    popup.confirm = confirm;
    popup.alert = function(info, title, cbk){
        confirm(info,title,cbk);
    };

    return popup;
});