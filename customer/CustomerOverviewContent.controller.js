sap.ui.define([
    "sap/ui/demo/wt/controller/BaseVisualisationTableController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.customer.CustomerOverviewContent", {
        onInit: function() {
            var sTableID = "customersTable"
            var aValidSortFields = ["CompanyName", "ContactName", "City", "Country"]
            var sRouteToMatch = "customersOverview"
            this.onInitOwnPage(sTableID, aValidSortFields, sRouteToMatch)
        },
        _initViewSettingsDialog: function() {
            var oRouter = this.getRouter();
            this._oVSD = new sap.m.ViewSettingsDialog("customerVsd", {
                confirm: function(oEvent) {
                    var oSortItem = oEvent.getParameter("sortItem");
                    this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"));
                }.bind(this)
            });
            // init sorting (with simple sorters as custom data for all fields)
            this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                key: "CompanyName",
                text: "Company Name",
                selected: true // we do this because our MockData is sorted anyway by EmployeeID
            }));
            this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                key: "ContactName",
                text: "Contact Name",
                selected: false
            }));
            this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                key: "City",
                text: "City",
                selected: false
            }));
            this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                key: "Country",
                text: "Country",
                selected: false
            }));
        },
        _applySearchFilter: function(sSearchQuery) {
            var aFilters, oFilter, oBinding;
            // first check if we already have this search value
            if (this._sSearchQuery === sSearchQuery) {
                return;
            }
            this._sSearchQuery = sSearchQuery;
            this.byId("customersearchField").setValue(sSearchQuery);
            // add filters for search
            aFilters = [];
            if (sSearchQuery && sSearchQuery.length > 0) {
                aFilters.push(new Filter("ContactName", FilterOperator.Contains, sSearchQuery));
                aFilters.push(new Filter("CompanyName", FilterOperator.Contains, sSearchQuery));
                aFilters.push(new Filter("City", FilterOperator.Contains, sSearchQuery));
                aFilters.push(new Filter("Country", FilterOperator.Contains, sSearchQuery));
                oFilter = new Filter({ filters: aFilters, and: false }); // OR filter
            } else {
                oFilter = null;
            }
            // update list binding
            oBinding = this._oTable.getBinding("items");
            oBinding.filter(oFilter, "Application");
        },
        onItemPress: function(oEvent) {
            var oItem = oEvent.getParameter("listItem")
            var oCtx = oItem.getBindingContext();
            var oRouter = this.getRouter(this);
            oRouter.navTo("customer", {
                customerPath: oItem.getBindingContext("customer").getPath().substr(1)
            });
        }
    });
});