sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function(BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.product.Product", {
        onInit: function() {
            var oRouter = this.getRouter(this);
            oRouter.getRoute("product").attachPatternMatched(this._onObjectMatched, this)
        },
        _onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").productPath,
                model: "product"
            });
        }
    });
});