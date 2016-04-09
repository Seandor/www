function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}
/*
	现在这个函数有两个问题，一是一组属性中的第一个属性已经达到目标值，在第一次循环的时候，定时器就会被关闭，导致无法
	同时运动；第二个问题是当所有的属性都达到目标值后无法再将flag置为true，也就无法关闭定时器，无法执行所谓的回调函数。
	解决了这两个问题，这个函数才能正常工作。
 */
function startMove(item, json, fn) {
	clearInterval(item.timer);
	item.timer = setInterval(function() {
		var flag = true;
		for (var attr in json) {
			var currentAttr = 0;
			// customize the speed
			var speed = 0;
			if (attr == 'opacity') {
				currentAttr = parseFloat(getStyle(item,attr)) * 100;
				speed = (json[attr] - currentAttr) / 4;
			} else {
				currentAttr = parseInt(getStyle(item,attr));
				speed = (json[attr] - currentAttr) / 8;
			}
			
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (currentAttr != json[attr]) {
				flag = false;
			} 
			if (attr == 'opacity') {
				item.style[attr] = (currentAttr + speed) / 100;
			} else {
				item.style[attr] = currentAttr + speed + 'px';
			}			
		}
		if (flag) {
			clearInterval(item.timer);
			if (fn) {
				fn();
			}
		}
	}, 30);
}
