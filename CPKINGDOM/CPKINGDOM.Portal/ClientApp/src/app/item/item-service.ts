import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Item } from "../models/item";

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`item/getcategories`);
    }
    getBrands() {
        return this.http.get<Brand[]>(`item/getbrands`);
    }
    getItems() {
        return this.http.get<Item[]>(`item/getitems`);
    }
    saveNewItem(item: Item) {
        return this.http.post(`item/savenewitem`, item);
    }
    updateItem(item: Item) {
        return this.http.post(`item/updateitem`, item);
    }
}