function main() {
	var testElement = document.getElementById("testElement");

	CustomDomEvents.registerEventType("mouseover2");

	testElement.addEventListener("mouseover", function (e) {
		testElement.onmouseover2(e);
	});

	testElement.addEventListener("mouseover2", function (e) {
		console.log("onmouseover2");
	});

	testElement.addEventListener("mouseover2", function (e) {
		console.log("onmouseover2");
	});


}