function main() {
	var LONG_CLICK_MS = 500;

	var testElement = document.getElementById("testElement"),
		longClickEventActive = true,
		mouseDownTime;

	CustomDomEvents.registerEventType("longclick");

	function onMouseDown(e) {
		mouseDownTime = new Date().getTime();
	}

	function onMouseUp(e) {
		var clickDuration = new Date().getTime() - mouseDownTime;
		console.log("Click duration: " + clickDuration + "ms");
		if (clickDuration >= LONG_CLICK_MS) {
			testElement.onlongclick(e);
		}
	}

	function onLongClick(e) {
		alert("Loooooonnnng click :)");
	}

	testElement.addEventListener("mousedown", onMouseDown);
	testElement.addEventListener("mouseup", onMouseUp);
	testElement.addEventListener("longclick", onLongClick);

	document.addEventListener("keypress", function (e) {
		if (longClickEventActive) {
			testElement.removeEventListener("longclick", onLongClick);
			console.log("longclick event listener removed");
		} else {
			testElement.addEventListener("longclick", onLongClick);
			console.log("longclick event listener added");
		}
		longClickEventActive = !longClickEventActive;
	});
}