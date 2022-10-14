import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { Item } from "../models/item";

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`item/getcategories`);
    }
    getItems() {
        return this.http.get<Item[]>(`item/getitems`);
    }
    saveNewItem(item: Item) {
        return this.http.post(`item/savenewitem`, item);
    }
}