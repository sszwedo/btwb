sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("beat.beat.controller.Empty", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf beat.beat.view.Empty
		 */
		onInit: function () {

			// get the handle of router
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// attach an event to the router which will be fired 
			//whenever DetailView route is found in the URL Pattern
			oRouter.getRoute("masterDetailRoute").attachPatternMatched(this._onObjectMatched, this);

		},

		setButtons: function (showS) {

			this.getView().byId("sd").setVisible(!showS);
			this.getView().byId("sc").setVisible(showS);
			this.getView().byId("edit").setVisible(!showS);
			this.getView().byId("save").setVisible(showS);
			this.getView().byId("cancel").setVisible(showS);

		},

		handleEditPress: function () {

			/*	//Clone the data
				this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().SupplierCollection[0]);
				this._toggleButtonsAndView(true);*/

			this.setButtons(true);

		},

		handleCancelPress: function () {

			/*			//Restore the data
						var oModel = this.getView().getModel();
						var oData = oModel.getData();

						oData.SupplierCollection[0] = this._oSupplier;

						oModel.setData(oData);
						this._toggleButtonsAndView(false);*/

			this.setButtons(false);

		},

		handleSavePress: function () {

			//	this._toggleButtonsAndView(false);

			this.setButtons(false);

			//????????????????????
			var oModel = this.getOwnerComponent().getModel();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oModel.submitChanges();

		},

		_onObjectMatched: function (oEvent) {
			// read the path variable which is passed as part of 
			// the URL pattern (defined in router configuration)
			var sPath = oEvent.getParameter("arguments").IDWind;
			// use the path to perform Element binding on the s
			// ObjectHeader UI control in this view
			this.getView().bindElement("/".concat(sPath));
		},

		/*		onPressButton: function () {
					this.getView().getParent().getParent().setMode("HideMode");
					this.oRouter.navTo("fullScreenRoute");
				},*/

		///forecast functions
		_formatDate: function (date) {
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) {
				month = '0' + month;
			}
			if (day.length < 2) {
				day = '0' + day;
			}
			return [year, month, day].join('-');
		},

		_mapResults: function (results) {
			var oModel = this.getView().getModel("forecast");

			var aForecastResults = [];
			for (var i = 0; i < results.list.length; i++) {
				var oTemp = results.list[i].temp;
				var date = this._formatDate(results.list[i].dt * 1000);
				aForecastResults.push({
					icon: results.list[i].weather[0].icon,
					date: date,
					temp: oTemp.day,
					speed: results.list[i].speed,
					//	units: "Celcius", 
					humidity: results.list[i].humidity,
					clouds: results.list[i].clouds,
					deg: results.list[i].deg

				});
			}

			oModel.setProperty("/items", aForecastResults);
		},

		_loadForecast: function () {
			var clon = "14.969902";
			var clat = "51.109342";
			var oView = this.getView();
			var oParams = {
				lon: clon,
				lat: clat,
				//q: "London", // Get the weather in london
				units: "metric",
				appid: "ee554b6dadcc2a02996b26ef6f4ab33a", // replace with your API key sandra - 816f5d163163bc1bcd71c8e69ede0abd
				cnt: 14, // get weather for the next 14 days
				mode: "json" // get it in JSON format 

			};
			var sUrl = "/OpenWeather/data/2.5/forecast/daily";
			oView.setBusy(true);

			var self = this;

			$.get(sUrl, oParams)
				.done(function (results) {
					oView.setBusy(false);
					self._mapResults(results);
				})
				.fail(function (err) {
					oView.setBusy(false);
					if (err !== undefined) {
						var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show(oErrorResponse.message, {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf beat.beat.view.Empty
		 */
		onBeforeRendering: function () {

		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf beat.beat.view.Empty
		 */
		onAfterRendering: function () {
			//forecast addon (detailed)
			this._loadForecast();
			this.getView().byId("sd").setVisible(true);
			this.getView().byId("sc").setVisible(false);

			// weather widget ini
			! function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (!d.getElementById(id)) {
					js = d.createElement(s);
					js.id = id;
					js.src = 'https://weatherwidget.io/js/widget.min.js';
					fjs.parentNode.insertBefore(js, fjs);
				}
			}(document, 'script', 'weatherwidget-io-js');
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf beat.beat.view.Empty
		 */
		//	onExit: function() {
		//
		//	}

	});

});