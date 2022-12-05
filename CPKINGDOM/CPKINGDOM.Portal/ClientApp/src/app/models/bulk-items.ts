import { Inventory } from "./inventory";

export class BulkItemModel {
    supplierId: number;
    dateReceived: string;
    selectedItems: Inventory[];
    constructor() {
        this.supplierId = 0;
        this.dateReceived = '';
        this.selectedItems = [];
    }
}