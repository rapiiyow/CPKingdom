export class Item {
    id: number;
    barcode: string;
    name: string;
    description: string;
    srp: number;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    reorderPoint: number;
    criticalLevel: number;
    constructor() {
        this.id = 0;
        this.barcode = '';
        this.name = '';
        this.description = '';
        this.srp = 0;
        this.categoryId = 0;
        this.categoryName = '';
        this.brandId = 0;
        this.brandName = '';
        this.reorderPoint = 0;
        this.criticalLevel = 0;
    }
}