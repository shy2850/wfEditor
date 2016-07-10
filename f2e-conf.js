exports["localhost"] = {
    "root": __dirname,
    "welcome": 'index.html',
    "uploadFile": true,
    "buildFilter": function (pathname) {
    	if (!pathname.match(/node_modules/)) {
    		return true;
    	} 
    },
    "port": 80
};
