(function () {

	var customEventTypesRegister = {};
	var customEventTypesByElement = {};

	var nativeAddEventListener = EventTarget.prototype.addEventListener;

	EventTarget.prototype.addEventListener = function(type, listener) {
		addCustomEventToElement(this, type);
		if (isRegisteredCustomEventType(type)) {
			customAddEventListener(this, type, listener);
		} else {
			nativeAddEventListener(type, listener);
		}
	};

	function registerEventType(eventType) {
		customEventTypesRegister[eventType] = 1;
	}

	function isRegisteredCustomEventType(eventType) {
		return !!customEventTypesRegister[eventType];
	}

	function addCustomEventToElement(element, eventType) {
		if (element[getEventName(eventType)] === undefined) {
			if (isRegisteredCustomEventType(eventType)) {
				var customEventTypes = getCustomEventsTypesForElement(element);
				if (!customEventTypes[eventType]) {
					var customEventListeners = [];
					element[getEventName(eventType)] = function () {
						var length = customEventListeners.length, i;
						for (i = 0; i < length; i++) {
							customEventListeners[i].apply(this, arguments);
						}
					};
					customEventTypes[eventType] = customEventListeners;
				}
			} else {
				throw "Event type " + eventType + " does not exist. You can add it by calling CustomDomEvents.registerEventType(\"" + eventType +"\")";
			}
		}
	}

	function getCustomEventsTypesForElement(element) {
		if (!customEventTypesByElement[element]) {
			customEventTypesByElement[element] = {};
		}
		return customEventTypesByElement[element];
	}

	function customAddEventListener(element, eventType, listener) {
		var customEventTypes = getCustomEventsTypesForElement(element);
		customEventTypes[eventType].push(listener);
	}

	function getEventName(eventType) {
		return "on" + eventType;
	}

	window.CustomDomEvents = {
		registerEventType: registerEventType
	};
	
} ());