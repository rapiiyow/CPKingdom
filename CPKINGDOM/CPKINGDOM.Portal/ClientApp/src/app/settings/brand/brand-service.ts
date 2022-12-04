import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Brand } from "../../models/brand";

@Injectable({ providedIn: 'root' })
export class BrandService {
    constructor(private http: HttpClient) { }
    getBrands() {
        return this.http.get<Brand[]>(`item/getbrands`);
    }
    saveNewBrand(brand: Brand) {
        return this.http.post(`${environment.apiUrl}item/savenewbrand`, brand);
    }
    updateBrand(brand: Brand) {
        return this.http.post(`${environment.apiUrl}item/updatebrand`, brand);
    }
}