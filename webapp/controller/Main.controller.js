sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/core/Fragment",
	'sap/m/MessageToast',
	"sap/ui/model/Sorter",
	"sap/ui/model/FilterOperator"
], function (Controller, formatter, Filter, Sorter, FilterOperator, Fragment, MessageToast) {
	"use strict";

	return Controller.extend("beat.beat.controller.Main", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf beat.beat.view.Main
		 */
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

		},

		// set windmill list icon color
		onFinsihed: function (oEvent) {
			var oList = oEvent.getSource();
			var oItems = oList.getItems();
			for (var i = 0; i < oItems.length; i++) {
				var oItem = oItems[i];
				var oIcon = oItem._getImage();
				var oContext = oItems[i].getBindingContext().getProperty("Type");
				if (oContext === "Success") {
					oIcon.addStyleClass("greenColor");
				} else if (oContext === "Warning") {
					oIcon.addStyleClass("yellowColor");
				} else {
					oIcon.addStyleClass("redColor");
				}
			}
		},

		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				aFilters.push(new Filter("Windm", sap.ui.model.FilterOperator.Contains, sQuery));
			}

			// update list binding
			var oList = this.byId("list0");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onlyFilter: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getKey();
			var filter = new Filter("Type", "EQ", sQuery);
			aFilters.push(filter);

			// update list binding
			var oList = this.byId("list0");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
			//iconcolor
			var oList = oEvent.getSource();
			var oItems = oList.getItems();
			for (var i = 0; i < oItems.length; i++) {
				var oItem = oItems[i];
				var oIcon = oItem._getImage();
				var oContext = oItems[i].getBindingContext().getProperty("Type");
				if (oContext === "Success") {
					oIcon.addStyleClass("greenColor");
				} else if (oContext === "Warning") {
					oIcon.addStyleClass("yellowColor");
				} else {
					oIcon.addStyleClass("redColor");
				}
			}

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
			//set notification list
			this.byId("list2").bindElement(oEvent.getSource().getBindingContext().getPath());
			//smartform visibility
			var emptyView = sap.ui.getCore().byId("container-beat---idEmpty");
			emptyView.getController().byId("sf0").setVisible(true);
			emptyView.getController().byId("sf1").setVisible(false);
			emptyView.getController().byId("fb1").setVisible(false);

		},

		onSelectionChangeNot: function (oEvent) {
			var emptyView = sap.ui.getCore().byId("container-beat---idEmpty");
			emptyView.getController().byId("sf1").bindElement(oEvent.getSource().getBindingContext().getPath());
			var sArray = ["sf1", "fb1", "sd", "edit"];
			var hArray = ["sf0", "sc", "save", "cancel"];

			function onShow(value) {
				emptyView.getController().byId(value).setVisible(true);
			}

			function onHide(value) {
				emptyView.getController().byId(value).setVisible(false);
			}
			sArray.forEach(onShow);
			hArray.forEach(onHide);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf beat.beat.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf beat.beat.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf beat.beat.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});