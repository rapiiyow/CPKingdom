import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`item/getcategories`);
    }
    saveNewCategory(category: Category) {
        return this.http.post(`item/savenewcategory`, category);
    }
    updateCategory(category: Category) {
        return this.http.post(`item/updatecategory`, category);
    }
}