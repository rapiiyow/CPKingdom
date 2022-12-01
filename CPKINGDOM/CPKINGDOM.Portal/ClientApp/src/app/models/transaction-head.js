"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHead = void 0;
var TransactionHead = /** @class */ (function () {
    function TransactionHead() {
        this.id = 0;
        this.transactionNo = '';
        this.customerName = '';
        this.customerContactNo = '';
        this.notes = '';
        this.technician = 0;
        this.status = '';
        this.isService = false;
        this.serviceFee = 0;
        this.createdBy = 0;
        this.createdDate = new Date();
        this.inventory = [];
        this.totalAmount = 0;
        this.totalPaid = 0;
        this.tranDateTime = new Date();
        this.staffName = '';
    }
    return TransactionHead;
}());
exports.TransactionHead = TransactionHead;
//# sourceMappingURL=transaction-head.js.map