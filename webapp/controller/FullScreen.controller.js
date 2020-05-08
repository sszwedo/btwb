sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("beat.beat.controller.FullScreen", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf beat.beat.view.FullScreen
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();

			// access OData model declared in manifest.json file
			var oModel = this.getOwnerComponent().getModel();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

			//map configuration
			var oMapConfig = {
				"MapProvider": [{
					"name": "HEREMAPS",
					"type": "",
					"description": "",
					"tileX": "256",
					"tileY": "256",
					"maxLOD": "20",
					"copyright": "Tiles Courtesy of HERE Maps",
					"Source": [{
						"id": "s1",
						"url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/reduced.day/{LOD}/{X}/{Y}/256/png8?app_id=Zbrkf1tV4cpT5ejtcpUY&app_code=6PHe3iVnd-nhwEuLmcV8ig"
					}, {
						"id": "s2",
						"url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/reduced.day/{LOD}/{X}/{Y}/256/png8?app_id=Zbrkf1tV4cpT5ejtcpUY&app_code=6PHe3iVnd-nhwEuLmcV8ig"
					}]
				}],
				"MapLayerStacks": [{
					"name": "DEFAULT",
					"MapLayer": {
						"name": "layer1",
						"refMapProvider": "HEREMAPS",
						"opacity": "1.0",
						"colBkgnd": "RGB(255,255,255)"
					}
				}]
			};

			var oGeoMap = this.getView().byId("GeoMap");
			oGeoMap.setMapConfiguration(oMapConfig);
			oGeoMap.setRefMapLayerStack("DEFAULT");

		},

		onPressButton: function () {
			this.getView().getParent().getParent().setMode("ShowHideMode");

			this.oRouter.navTo("masterDetailRoute");
		},

		onSelectionChange: function (oEvent) {
			// get the source control which triggered this event
			var oItem = oEvent.getSource();
			// get the binding context of the control
			var oCtx = oItem.getBindingContext();
			// get the binding path and truncate the first '/' 
			//so that it does not cause problem when appending the path as navigation //pattern in the url
			var sPath = oCtx.getPath().substr(1);
			// get the instance of the router and navigate to 
			//Detail View. 
			this.getView().getParent().getParent().setMode("ShowHideMode");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("masterDetailRoute", {
				IDWind: sPath
			});
			///set list2 in main controller
			var mainView = sap.ui.getCore().byId("container-beat---idMain");
			mainView.getController().byId("list2").bindElement(oEvent.getSource().getBindingContext().getPath());
			//smartform visible
			var emptyView = sap.ui.getCore().byId("container-beat---idEmpty");
			emptyView.getController().byId("sf0").setVisible(true);
			emptyView.getController().byId("sf1").setVisible(false);
			emptyView.getController().byId("fb1").setVisible(false);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf beat.beat.view.FullScreen
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf beat.beat.view.FullScreen
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf beat.beat.view.FullScreen
		 */
		//	onExit: function() {
		//
		//	}

	});

});