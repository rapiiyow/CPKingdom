"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.id = 0;
        this.itemId = 0;
        this.supplierId = 0;
        this.costPrice = 0;
        this.dateReceived = '';
        this.qtyReceived = 0;
        this.qtyAvailable = 0;
        this.remarks = '';
        this.barcode = '';
        this.itemName = '';
        this.description = '';
        this.srp = 0;
        this.supplierName = '';
        this.categoryName = '';
        this.brandName = '';
        this.itemFullName = '';
        this.qtyPurchased = 0;
        this.amountPaid = 0;
        this.tranBodyId = 0;
    }
    return Inventory;
}());
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.js.map