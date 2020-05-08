sap.ui.define([], function () {
	"use strict";
	return {
		imgStatus: function (status) {
			var imageS;
			var message = "sap-icon://message-";
			if (status === "Success") {
				imageS = message + "success";
			} else if (status === "Warning") {
				imageS = message + "warning";
			} else {
				imageS = message + "error";
			}

			return imageS;
		}
	};
});