sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseController, Filter, FilterOperator, Sorter) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.controller.BaseVisualisationTableController", {
        onInitOwnPage: function(sTableID, aValidSortFields, sRouteToMatch) {
            var oRouter = this.getRouter();
            this._oTable = this.getView().byId(sTableID);
            this._oVSD = null;
            this._sSortField = null;
            this._bSortDescending = false;
            this._oRouterArgs = null;
            this._aValidSortFields = aValidSortFields;
            this._aValidFilterFields = aValidFilterFields;
            this._sSearchQuery = null;
            oRouter.getRoute(sRouteToMatch).attachMatched(this._onRouteMatched, this);
            this._initViewSettingsDialog(sTableID + "Vsd", aValidSortFields);
        },
        _onRouteMatched: function(oEvent) {
            this._oRouterArgs = oEvent.getParameter("arguments");
            this._oRouterArgs.query = this._oRouterArgs["?query"] || {};
        },
        onSortButtonPressed: function(oEvent) {
            this._oVSD.open();
        },
        /**
         * Applies sorting on our table control.
         * @param {string} sSortField	  the name of the field used for sorting
         * @param {string} sortDescending  true or false as a string or boolean value to specify a descending sorting
         * @private
         */
        _applySorter: function(sSortField, sortDescending, aValidSortFields) {
            var bSortDescending, oBinding, oSorter;
            aValidSortFields.forEach(function(condition) {
                // only continue if we have a valid sort field
                if (sSortField === condition.key) {
                    // convert the sort order to a boolean value
                    if (typeof sortDescending === "string") {
                        bSortDescending = sortDescending === "true";
                    } else if (typeof sortDescending === "boolean") {
                        bSortDescending = sortDescending;
                    } else {
                        bSortDescending = false;
                    }
                    // sort only if the sorter has changed
                    if (this._sSortField && this._sSortField === sSortField && this._bSortDescending === bSortDescending) {
                        return;
                    }
                    this._sSortField = sSortField;
                    this._bSortDescending = bSortDescending;
                    oSorter = new Sorter(sSortField, bSortDescending);
                    // sync with View Settings Dialog
                    this._syncViewSettingsDialogSorter(sSortField, bSortDescending);
                    oBinding = this._oTable.getBinding("items");
                    oBinding.sort(oSorter);
                }
            }.bind(this));
        },
        _syncViewSettingsDialogSorter: function(sSortField, bSortDescending) {
            // Note: no input validation is implemented here 
            this._oVSD.setSelectedSortItem(sSortField);
            this._oVSD.setSortDescending(bSortDescending);
        },
        _initViewSettingsDialog: function(sNameVsd, aValidSortFields) {
            var oRouter = this.getRouter();
            this._oVSD = new sap.m.ViewSettingsDialog(sNameVsd, {
                confirm: function(oEvent) {
                    var oSortItem = oEvent.getParameter("sortItem");
                    this._applySorter(oSortItem.getKey(), oEvent.getParameter("sortDescending"), aValidSortFields);
                }.bind(this)
            });
            var nCount = 0;
            aValidSortFields.forEach(function(condition) {
                if (nCount === 0) {
                    this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                        key: condition.key,
                        text: condition.text,
                        selected: true //select by default the first item in the list
                    }));
                } else {
                    this._oVSD.addSortItem(new sap.m.ViewSettingsItem({
                        key: condition.key,
                        text: condition.text,
                        selected: false
                    }));
                }
                nCount = nCount + 1;
            }.bind(this));
        },
        onSearchTable: function(oEvent) {
            var sQuery = oEvent.getSource().getValue();
            this._applySearchFilter(oEvent.getSource().getValue(), this._aValidFilterFields);
        },
        _applySearchFilter: function(sSearchQuery, aValidFilterFields) {
            var aFilters, oFilter, oBinding, sID;
            sID = sTableID + "searchField";
            // first check if we already have this search value
            if (this._sSearchQuery === sSearchQuery) {
                return;
            }
            this._sSearchQuery = sSearchQuery;
            this.byId(sID).setValue(sSearchQuery);
            // add filters for search
            aFilters = [];
            if (sSearchQuery && sSearchQuery.length > 0) {
                this.aValidFilterFields.forEach(function(condition) {
                    aFilters.push(new Filter(condition.key, FilterOperator.Contains, sSearchQuery));
                }.bind(this));
                oFilter = new Filter({ filters: aFilters, and: false }); // OR filter
            } else {
                oFilter = null;
            }
            // update list binding
            oBinding = this._oTable.getBinding("items");
            oBinding.filter(oFilter, "Application");
        }
    });
});