import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Inventory } from "../models/inventory";
import { Supplier } from "../models/supplier";

@Injectable({ providedIn: 'root' })
export class InventoryService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`inventory/getcategories`);
    }
    getBrands() {
        return this.http.get<Brand[]>(`inventory/getbrands`);
    }
    getInventories() {
        return this.http.get<Inventory[]>(`inventory/getinventories`);
    }
    saveNewInventory(inventory: Inventory) {
        return this.http.post(`inventory/saveinventory`, inventory);
    }
    updateInventory(inventory: Inventory) {
        return this.http.post(`inventory/updateinventory`, inventory);
    }
    getSuppliers() {
        return this.http.get<Supplier[]>(`item/getsuppliers`);
    }
    getItemInventory(itemId) {
        return this.http.get<Inventory[]>(`inventory/getiteminventory?itemId=${itemId}`);
    }
}