import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Category } from "../../models/category";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`${environment.apiUrl}item/getcategories`);
    }
    saveNewCategory(category: Category) {
        return this.http.post(`${environment.apiUrl}item/savenewcategory`, category);
    }
    updateCategory(category: Category) {
        return this.http.post(`${environment.apiUrl}item/updatecategory`, category);
    }
}