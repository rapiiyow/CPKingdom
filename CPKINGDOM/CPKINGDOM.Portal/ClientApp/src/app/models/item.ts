﻿export class Item {
    id: number;
    barcode: string;
    name: string;
    description: string;
    srp: number;
    categoryId: number;
    categoryName: string;
    constructor() {
        this.id = 0;
        this.barcode = '';
        this.name = '';
        this.description = '';
        this.srp = 0;
        this.categoryId = 0;
        this.categoryName = '';
    }
}