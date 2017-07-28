sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.wt.controller.Home", {
        onDisplayNotFound: function(oEvent) {
            // display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("notFound", {
                fromTarget: "home"
            });
        },
        onNavToCustomersList: function(oEvent) {
            this.getRouter().navTo("customersList");
        },
        onNavToSuppliersList: function(oEvent) {
            this.getRouter().navTo("suppliersOverview");
        },
        onNavToProductsList: function(oEvent) {
            this.getRouter().navTo("productsOverview");
        },

        onNavToInvoicesList: function(oEvent) {
            this.getRouter().navTo("invoicesList");
        },

        onNavToInvoicesOverview: function(oEvent) {
            this.getRouter().navTo("invoicesOverview");
        }
    });

});