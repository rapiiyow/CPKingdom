import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Inventory } from "../models/inventory";
import { Item } from "../models/item";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class ReportService {
    constructor(private http: HttpClient) {

    }
    getReorderPoint() {
        return this.http.get<Inventory[]>(`${environment.apiUrl}inventory/getreorderpoint`);
    }
    getUnpaidPurchase() {
        return this.http.get<TransactionHead[]>(`${environment.apiUrl}transaction/getunpaidpurchase`);
    }
    getUnpaidService() {
        return this.http.get<TransactionHead[]>(`${environment.apiUrl}transaction/getunpaidservice`);
    }
    getItemInventoryLog(itemId) {
        return this.http.get<any[]>(`${environment.apiUrl}inventory/getiteminventorylog?itemId=${itemId}`);
    }
    getItems() {
        return this.http.get<Item[]>(`${environment.apiUrl}item/getitems`);
    }
}