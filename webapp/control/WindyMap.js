sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"

], function (Control, RatingIndicator, Label, Button) {
	"use strict";
	const options = {
		// Required: API key
		key: undefined, // REPLACE WITH YOUR KEY !!!
		verbose: undefined,
		// Optional: Initial state of the map
		lat: undefined,
		lon: undefined,
		zoom: undefined,
	};
	return Control.extend("beat.beat.control.WindyMap", {
		metadata: {
			properties: {
				key: {
					type: "string",
					defaultValue: ''
				},
				verbose: {
					type: "bool",
					defaultValue: true
				},
				lat: {
					type: "float",
					defaultValue: 51.109342
				},
				lon: {
					type: "float",
					defaultValue: 14.969902
				},
				zoom: {
					type: "float",
					defaultValue: 1
				}
			},
			aggregations: {

			},
			events: {

			}
		},

		init: function () {

		},

		setValue: function (iValue) {
			this.setProperty("value", iValue, true);
			this.getAggregation("_rating").setValue(iValue);
		},

		renderer: function (oRM, oControl) {
			options.key = oControl.getKey();
			options.verbose = oControl.getVerbose();
			options.lat = oControl.getLat();
			options.lon = oControl.getLon();
			options.zoom = oControl.getZoom();

			// Initialize Windy API
			windyInit(options, windyAPI => {
				// windyAPI is ready, and contain 'map', 'store',
				// 'picker' and other usefull stuff

				const {
					map
				} = windyAPI;

				// openstreetmap zoom
				/*	map.options.minZoom = 4;
					map.options.maxZoom = 17;

					var topLayer = L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: 'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ',
						minZoom: 12,
						maxZoom: 17
					}).addTo(map);*/
				// .map is instance of Leaflet map

				// L.popup()
				// 	.setLatLng([50.4, 14.3])
				// 	.setContent('Hello World')
				// 	.openOn(map);
			});

			oRM.write("<div id='windy' style='width: 100%; height: 500px;'></div>");
			// oRM.writeControlData(oControl);
			// oRM.addClass("myAppDemoWTProductRating");
			// oRM.writeClasses();
			// oRM.write(">");
			// oRM.renderControl(oControl.getAggregation("_rating"));
			// oRM.renderControl(oControl.getAggregation("_label"));
			// oRM.renderControl(oControl.getAggregation("_button"));
			// oRM.write("</div>");
		}
	});
});