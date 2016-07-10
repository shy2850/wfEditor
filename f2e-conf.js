exports["localhost"] = {
    "root": "d:\\doc\\github\\wfEditor\\",
    "uploadFile": true,
    "buildFilter": function (pathname) {
    	if (!pathname.match(/node_modules/)) {
    		return true;
    	} 
    },
    "port": 80
};
