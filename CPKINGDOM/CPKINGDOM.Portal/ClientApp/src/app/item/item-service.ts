import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Item } from "../models/item";

@Injectable({ providedIn: 'root' })
export class ItemService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`${environment.apiUrl}item/getcategories`);
    }
    getBrands() {
        return this.http.get<Brand[]>(`${environment.apiUrl}item/getbrands`);
    }
    getItems() {
        return this.http.get<Item[]>(`${environment.apiUrl}item/getitems`);
    }
    saveNewItem(item: Item) {
        return this.http.post(`${environment.apiUrl}item/savenewitem`, item);
    }
    updateItem(item: Item) {
        return this.http.post(`${environment.apiUrl}item/updateitem`, item);
    }
}