#wfEditor
基于wfQuery的极简可定制化的富文本编辑器

依赖 [f2e-server](https://github.com/shy2850/node-server) 完整运行, 

Demo: <http://webfuture.cn/wfEditor/index.html>

`npm install wfeditor` 

- npm install
```
    "dependencies": {
        "codemirror": "^5.3.0",
        "js-beautify": "^1.5.7",
        "marked": "^0.3.3",
        "wfquery": "^0.2.0"
    }
```
- libs: 通过 f2e-server 代理 百度CDN 获取
```
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
```
