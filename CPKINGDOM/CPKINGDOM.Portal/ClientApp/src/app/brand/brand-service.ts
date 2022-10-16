import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand";

@Injectable({ providedIn: 'root' })
export class BrandService {
    constructor(private http: HttpClient) { }
    getBrands() {
        return this.http.get<Brand[]>(`item/getbrands`);
    }
    saveNewBrand(brand: Brand) {
        return this.http.post(`item/savenewbrand`, brand);
    }
    updateBrand(brand: Brand) {
        return this.http.post(`item/updatebrand`, brand);
    }
}