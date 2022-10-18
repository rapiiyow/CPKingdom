export class Inventory {
    id: number;
    itemId: number;
    supplierId: number;
    costPrice: number;
    dateReceived: string;
    qtyReceived: number;
    qtyAvailable: number;
    remarks: string;
    barcode: string;
    itemName: string;
    description: string;
    srp: number;
    supplierName: string;
    categoryName: string;
    brandName: string;
    itemFullName: string;
    constructor() {
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
    }
}