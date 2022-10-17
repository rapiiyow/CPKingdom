import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Supplier } from "../models/supplier";

@Injectable({ providedIn: 'root' })
export class SupplierService {
    constructor(private http: HttpClient) { }
    getSuppliers() {
        return this.http.get<Supplier[]>(`item/getsuppliers`);
    }
    saveNewSupplier(supplier: Supplier) {
        return this.http.post(`item/savenewsupplier`, supplier);
    }
    updateSupplier(supplier: Supplier) {
        return this.http.post(`item/updatesupplier`, supplier);
    }
}