sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function(BaseController) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Detail", {
        onInit: function() {
            var oRouter = this.getRouter(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this)
        },
        _onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + oEvent.getParameter("arguments").invoicePath,
                model: "invoice"
            });
        }
    });
});