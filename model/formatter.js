sap.ui.define([], function() {
    "use strict";
    return {
        statusText: function(sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "A":
                    return resourceBundle.getText("invoiceStatusA");
                case "B":
                    return resourceBundle.getText("invoiceStatusB");
                case "C":
                    return resourceBundle.getText("invoiceStatusC");
                default:
                    return sStatus;
            }

        },
        currency: function(amount, currency) {

            var change = [];
            change.push(amount);
            change.push(currency);
            var sInternalType = "";
            var amount1 = new sap.ui.model.type.Currency();


            amount1.formatValue(change, sInternalType);
            return amount1;
        }

    };

});