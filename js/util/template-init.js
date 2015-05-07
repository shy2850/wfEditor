/**
 * @author SHY2850
 * @namespace template-init
 * @requires: template 
 * @version 2.0
 * @description 使用handlebars初始化数据,将结果填充到指定选择器的dom
 */
define("util/template-init",["wf"],function(_require, exports, module) {
    var $ = require("wf"), base = {
        append: false,
        sourceMethod : "get",
        sourceData : function(){
            return {};
        },
        page:{size:'page.size',to:'page.pn'},
        nonResult : '<div class="no-content" style="padding-top: 150px;"><span class="nocon-bid"></span><span class="nocon-detail">暂无内容！</span></div>'
    };

    /**
     * 分页插件
    **/
    $.fn.toPager = function(opt){
        return $(this).each(function(){
            var _this = $(this);
            var o = $.extend({
                el : _this,
                totalPage : 1,
                currentPage: 1,
                preposePagesCount : 1,
                postposePagesCount : 1,
                firstPagesCount : 2,
                lastPagesCount : 2,
                'switch': null
            },opt);

            var paginationInner = '',
                totalPage = o.totalPage,
                currPage = o.currentPage,
                preposePagesCount = o.preposePagesCount,
                postposePagesCount = o.postposePagesCount,
                firstPagesCount = o.firstPagesCount,
                lastPagesCount = o.lastPagesCount,
                offset;
            /**
             * @brief 渲染可点击的页码
             * @param index {Number} 页码索引
             *
             */
            function _renderActivePage(index) {
                return '<a class="pagination-spec" data-page="' + index + '">' + index + '</a>';
            }

            // currPage前的页码展示
            paginationInner += currPage === 1 
                ? '<span class="pagination-start"><span>上一页</span></span>' 
                : '<a class="pagination-prev"><span>上一页</span></a>';
            if (currPage <= firstPagesCount + preposePagesCount + 1) {
                for(var i=1; i<currPage; i++) {
                    paginationInner += _renderActivePage(i);
                }
            } else {
                for(var i=1; i<=firstPagesCount; i++) {
                    paginationInner += _renderActivePage(i);
                }
                paginationInner += '<span class="pagination-break">...</span>';
                for(var i=currPage-preposePagesCount; i<=currPage-1; i++) {
                    paginationInner += _renderActivePage(i);
                }
            }               

            // currPage的页码展示
            paginationInner += '<span class="pagination-curr">' + currPage + '</span>';

            // currPage后的页码展示
            if (currPage >= totalPage - lastPagesCount - postposePagesCount) {
                offset = currPage + 1;
                for(var i=currPage+1; i<=totalPage; i++) {
                    paginationInner += _renderActivePage(i);
                }

            } else {
                for(var i=currPage+1; i<=currPage+postposePagesCount; i++) {
                    paginationInner += _renderActivePage(i);
                }
                paginationInner += '<span class="pagination-break">...</span>';
                for(var i=totalPage-lastPagesCount+1; i<=totalPage; i++) {
                    paginationInner += _renderActivePage(i);
                }
            }
            totalPage =  totalPage === 0 ? 1 : totalPage;   //totalPage==0时，下一页不可点击
            paginationInner += currPage === totalPage 
                ? '<span class="pagination-end"><span>下一页</span></span>' 
                : '<a class="pagination-next"><span>下一页</span></a>';
            $(o.el).html(paginationInner);

            function _switchToPage(page) {
                o.currentPage = Number(page);
                _this.toPager(o,true);  //不带初始化的分页加载
                _this.trigger('switch', {
                    toPage: o.currentPage 
                });
            }
            _this.off('switch').on('switch',o["switch"]);
            $(o.el).off('click').on('click','.pagination-spec',function(e){
                _switchToPage( $(this).html() )
            }).on('click','.pagination-prev',function(e){
                _switchToPage( Number( $(this).siblings(".pagination-curr").html() ) - 1 )
            }).on('click','.pagination-next',function(e){
                _switchToPage( Number( $(this).siblings(".pagination-curr").html() ) + 1 )
            });
        });
    };

    /**
     * 创建自定义操作标签。
    **/
    Handlebars.registerHelper('division', function(a, b) {
        return a / b;
    });

    
    /**
     * @name T
     */
    return {
        __simple__ : function(o,first){
            if( typeof o.begin === "function" ){
                o.begin.call(this,o,first);
            }

            var tpl = $(o.tmpl).html();
            var target = $(o.target);
            var html =  Handlebars.compile( tpl )(o.source),
                dom = $("<div>"+html+"</div>");
            var currentPage = dom.children(".currentPage").hide().html(),
                totalPage = Math.ceil( dom.children(".totalPage").hide().html() );
            
            $(o.pagination).hide(); //先隐藏分页组件
            if(totalPage === 0 ){
                dom.html( o.nonResult );
            }

            if(o.prepend){
                target.prepend( dom.html() );
            }else{
                o.append ? target.append( dom.html() ) : target.html( dom.html() );
            }

            var p = null;
            if( o.pagination ){
                require(['form-style'],function(){
                    if( totalPage != "0" ){
                        $(o.pagination).show();
                    }
                    o.url = location.href.replace( new RegExp('([?])?[&]?'+o.page.to+'=\\w*&?'),"$1");
                    p = $(o.pagination).toPager({
                        currentPage: Math.floor(currentPage) || 1,    // 默认选中的页码
                        totalPage: totalPage | 0      // 总页数
                    },!first);
                    
                    if( typeof o.callback === "function" ){
                        o.callback.call(this,o,p,first);
                    }else if(p && first){
                        p.on("switch",function(event,e){
                            location.href = o.url + ( o.url.indexOf("?") > -1 ? ("&"+o.page.to+"=" + e.toPage) : ("?"+o.page.to+"=" + e.toPage) );
                        });
                    }
                });
            }
                
        },
        __ajax__ : function(o,first){
            var tpl = $(o.tmpl).html();
            var target = $(o.target);
            var type = (o.sourceMethod == "post") ? "post" : "get";
            var _self = this;
            if( typeof o.before === "function" ){
                o.before.call(_self,o,first);
            }else{
                if( !o.prepend && !o.append ){
                    target.html("");
                    target.append( $('<div class="list-wait">等待中...</div>') );
                }
            }

            var _d = {};    //参数处理
            if("get" === type){
                _d.t = new Date().getTime()
            }
            if(o.pagination){
                _d[o.page.to] = o.toPage||1;
                _d[o.page.size] = 10
            }

            $.extend(_d, o.sourceData() )

            $[type](o.sourceUrl.replace(/\{\{([^}]*)\}\}/g,function(kw,w){
                var r = _d[w];
                if( typeof r != "undefined" ){
                    return r;
                }   // 提供restful支持
            }), _d,function(data){

                if(data.code && data.code != 200){
                    target.html( o.nonResult );
                    return ;
                }

                $(o.pagination).hide(); //先隐藏分页组件

                o.source = data;

                if( typeof o.begin === "function" ){
                    o.begin.call(_self,o,first);
                }

                var html = Handlebars.compile( tpl )(o.source),
                    dom = $("<div>"+html+"</div>");
               
                var currentPage = dom.children(".currentPage").remove().html(),
                    totalPage = Math.ceil( dom.children(".totalPage").remove().html() );
                if(totalPage === 0 ){
                    dom.html( o.nonResult );
                }

                dom.remove(".list-wait");

                if(o.prepend){
                    target.prepend( dom.html() );
                }else{
                    o.append ? target.append( dom.html() ) : target.html( dom.html() );
                }

                var p = null;
                if( o.pagination ){
                    p = $(o.pagination).toPager({
                        currentPage: Math.floor(currentPage) || 1,    // 默认选中的页码
                        totalPage: totalPage | 0,      // 总页数
                        "switch" :function(event,e){
                            o.toPage = e.toPage;
                            $(this).hide();
                            _self.__ajax__(o);
                        }
                    },!first);
                    if( totalPage != "0" ){
                        p.show();
                    }
                }
                if( typeof o.callback === "function" ){
                    o.callback.call(_self,o,p,first);
                }
            }, o.dataType || 'json');
        },
        __init__: function(options,first){
            var tpl = $(options.tmpl), _this = this;
            return tpl.each(function(){
                var _t = $(this),
                    o = $.extend($.extend({},base),{
                        sourceUrl: _t.attr("data-url"),
                        target : _t.attr("data-target"),
                        append : _t.attr("data-append"),
                        prepend: _t.attr("data-prepend"),
                        pagination : _t.attr("data-pagination"),
                        sourceMethod : _t.attr("data-method"),
                        dataType: _t.attr("data-type")
                    },options);

                if( o.sourceUrl ){
                    _this.__ajax__(o,first);
                }else{
                    _this.__simple__(o,first);
                }
            });
        },
        init : function(options){
            return this.__init__(options,true);
        },
        refresh : function(options){
            return this.__init__(options,false);
        }
    };

});