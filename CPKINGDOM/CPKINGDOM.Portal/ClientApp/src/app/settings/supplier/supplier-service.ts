import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Supplier } from "../../models/supplier";

@Injectable({ providedIn: 'root' })
export class SupplierService {
    constructor(private http: HttpClient) { }
    getSuppliers() {
        return this.http.get<Supplier[]>(`${environment.apiUrl}item/getsuppliers`);
    }
    saveNewSupplier(supplier: Supplier) {
        return this.http.post(`${environment.apiUrl}item/savenewsupplier`, supplier);
    }
    updateSupplier(supplier: Supplier) {
        return this.http.post(`${environment.apiUrl}item/updatesupplier`, supplier);
    }
}