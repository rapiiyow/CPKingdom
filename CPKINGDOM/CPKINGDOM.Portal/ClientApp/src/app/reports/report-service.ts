import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Inventory } from "../models/inventory";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class ReportService {
    constructor(private http: HttpClient) {

    }
    getReorderPoint() {
        return this.http.get<Inventory[]>(`inventory/getreorderpoint`);
    }
    getUnpaidPurchase() {
        return this.http.get<TransactionHead[]>(`transaction/getunpaidpurchase`);
    }
    getUnpaidService() {
        return this.http.get<TransactionHead[]>(`transaction/getunpaidservice`);
    }
}