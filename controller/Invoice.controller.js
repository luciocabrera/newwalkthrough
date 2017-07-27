sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function(BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.controller.Invoice", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("invoice").attachPatternMatched(this._onObjectMatched, this)
        },
        _onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").invoicePath,
                model: "invoice"
            });
        }
    });
});