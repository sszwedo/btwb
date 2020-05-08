sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		///forecast
		createAPIModel: function () {
			var oModel = new JSONModel();
			oModel.setData({
				city: "",
				country: "",
				cols: [{
						name: "Icon"
					}, {
						name: "Date"
					}, {
						name: "Temp. [°C]"
					}, {
						name: "Wind [m/s]"
					}, {
						name: "Humidity [%]"
					}, {
						name: "Clouds [%]"
					}, {
						name: "Deg."
					}
					/*, {
						name: "Units"
					}
					}*/
				],
				items: []
			});
			return oModel;
		}

	};
});