define("util/requestAFrame",[],function(_require, exports, module) {
	var _timeoutQueue = {}, index = 0,
		requestAFrame = (function () {
			return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function (fn) {
					return window.setTimeout(fn, 1000/60); 
				};
		})();
	exports = exports || {};
	/**
	 * 按照指定key添加轮训事件 【首次添加一般不会立即执行】
	 * k	: 轮询事件的key
	 * fn 	: 要轮训的事件	return false; 
	 * timer: 轮训间隔,单位ms, 默认是200, 只支持 1000/60 的倍数
	 * times: 轮询事件执行次数, 达到指定次数后清除
	**/
	exports.addTimeout = function(k,fn,timer,times){
		fn.timer = Math.floor( (timer||200) * 60 / 1000);
		fn.times = times || Infinity;
		_timeoutQueue[k] = fn;
	};

	function queueTimeout(){
		for(var i in _timeoutQueue){
			var fn = _timeoutQueue[i];
			if( index % fn.timer === 0 ){	//如果按照时间轮训到了，执行代码
				if( !fn.times-- ){			//如果可执行次数为0, 移除方法
					delete _timeoutQueue[i];
				}else{
					var _r = fn();	
					if(_r === false){
						delete _timeoutQueue[i];
					}
				}
			}
		}
		requestAFrame(queueTimeout);
		index = ( index + 1) % (18000) ; //最高时隔5分钟
	}

	queueTimeout();	

	return exports;
});
