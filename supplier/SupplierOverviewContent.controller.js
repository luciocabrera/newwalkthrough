sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseVisualisationTableController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseVisualisationTableController.extend("sap.ui.demo.wt.supplier.SupplierOverviewContent", {
        onInit: function() {
            var sTableID = "suppliersTable"
            var aValidSortFields = [
                { key: "CompanyName", text: "Company Name" },
                { key: "ContactName", text: "Contact Name" },
                { key: "City", text: "City" },
                { key: "Country", text: "Country" }
            ];
            var aValidFilterFields = [
                { key: "CompanyName", text: "Company Name" },
                { key: "ContactName", text: "Contact Name" }
            ];
            var sRouteToMatch = "suppliersOverview"
            this.onInitOwnPage(sTableID, aValidSortFields, sRouteToMatch)
        },
        /*     _applySearchFilter: function(sSearchQuery) {
                 var aFilters, oFilter, oBinding;
                 // first check if we already have this search value
                 if (this._sSearchQuery === sSearchQuery) {
                     return;
                 }
                 this._sSearchQuery = sSearchQuery;
                 this.byId("suppliersearchField").setValue(sSearchQuery);
                 // add filters for search
                 aFilters = [];
                 if (sSearchQuery && sSearchQuery.length > 0) {
                     aFilters.push(new Filter("ContactName", FilterOperator.Contains, sSearchQuery));
                     aFilters.push(new Filter("CompanyName", FilterOperator.Contains, sSearchQuery));
                     oFilter = new Filter({ filters: aFilters, and: false }); // OR filter
                 } else {
                     oFilter = null;
                 }
                 // update list binding
                 oBinding = this._oTable.getBinding("items");
                 oBinding.filter(oFilter, "Application");
             },*/
        onItemPress: function(oEvent) {
            var oItem = oEvent.getParameter("listItem")
            var oCtx = oItem.getBindingContext();
            var oRouter = this.getRouter(this);
            oRouter.navTo("supplier", {
                supplierPath: oItem.getBindingContext("supplier").getPath().substr(1)
            });
        }
    });
});