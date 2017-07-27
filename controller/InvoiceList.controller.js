sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/wt/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.controller.InvoiceList", {
        formatter: formatter,
        onInit: function() {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        },
        onFilterInvoices: function(oEvent) {
            //build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }
            //filter binding
            var oList = this.getView().byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            });
        },
        onListItemPressed: function(oEvent) {
            var oItem, oCtx;

            oItem = oEvent.getSource();
            oCtx = oItem.getBindingContext();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("invoice", {
                invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            });

        }
    });
});