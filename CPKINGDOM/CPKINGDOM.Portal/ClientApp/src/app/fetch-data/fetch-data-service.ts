import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Category } from "./model/category";

@Injectable({ providedIn: 'root' })
export class FectchDataService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<Category[]>(`weatherforecast/getcategories`);
    }
}