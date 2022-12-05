import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Brand } from "../models/brand";
import { BulkItemModel } from "../models/bulk-items";
import { Category } from "../models/category";
import { Inventory } from "../models/inventory";
import { Supplier } from "../models/supplier";

@Injectable({ providedIn: 'root' })
export class InventoryService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`${environment.apiUrl}inventory/getcategories`);
    }
    getBrands() {
        return this.http.get<Brand[]>(`${environment.apiUrl}inventory/getbrands`);
    }
    getInventories() {
        return this.http.get<Inventory[]>(`${environment.apiUrl}inventory/getinventories`);
    }
    saveNewInventory(inventory: Inventory) {
        return this.http.post(`${environment.apiUrl}inventory/saveinventory`, inventory);
    }
    updateInventory(inventory: Inventory) {
        return this.http.post(`${environment.apiUrl}inventory/updateinventory`, inventory);
    }
    getSuppliers() {
        return this.http.get<Supplier[]>(`${environment.apiUrl}item/getsuppliers`);
    }
    getItemInventory(itemId) {
        return this.http.get<Inventory[]>(`${environment.apiUrl}inventory/getiteminventory?itemId=${itemId}`);
    }
    saveBulkItems(bulkItems: BulkItemModel) {
        return this.http.post(`${environment.apiUrl}inventory/savebulkitems`, bulkItems);
    }
}