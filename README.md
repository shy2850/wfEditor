# wfEditor
基于[wfQuery](https://github.com/shy2850/wfQuery)的极简可定制化的富文本编辑器

`npm install wfeditor`

- libs: 通过 [f2e-server](http://f2e-server.com/agent.html#save) 代理 [百度CDN](http://cdn.code.baidu.com/) 获取
        
        exports["wfeditor.cn"] = {
            root: "E:\\github\\wfEditor\\",
            agent:{
                get:function(path){
                    return {
                        host: "apps.bdimg.com",
                        save: true
                    }
                }
            }
        };
