
var eventUtil = {
	addHandler:function(element, event, handler) {
		if (element.addEventListener) {
			element.addEventListener(event, handler, false);
		} else if (element.attach) {
			element.attach(element, handler);
		} else {
			element['on'+event] = handler;
		}
	},

	removeHandler:function(element, event, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(event, handler, false);
		} else if (element.detach) {
			element.detach(element, handler);
		} else {
			element['on'+event] = handler;
		}
	},

	getEvent:function(event) {
		return event ? event : window.event;
	},

	getType:function(event) {
		event = event || window.event;
		return event.type;
	},

	getElement:function(event) {
		event = event || window.event;
		return event.target || event.srcElement;
	},

	preventDefault:function(event) {
		event = event || window.event;
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	stopPropagation:function(event) {
		event = event || window.event;
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};