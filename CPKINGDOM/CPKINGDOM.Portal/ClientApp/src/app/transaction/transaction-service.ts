import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Inventory } from "../models/inventory";
import { JResponse } from "../models/JResponse";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class TransactionService {
    constructor(private http: HttpClient) {

    }
    getPurchaseNo() {
        return this.http.get<JResponse>(`${environment.apiUrl}transaction/getpurchaseno`);
    }
    getServiceNo() {
        return this.http.get<JResponse>(`${environment.apiUrl}transaction/getserviceno`);
    }
    getTechnicians() {
        return this.http.get<JResponse>(`${environment.apiUrl}transaction/gettechnicians`);
    }
    getAvailableItems() {
        return this.http.get<Inventory[]>(`${environment.apiUrl}inventory/getavailableitems`);
    }
    saveNewPurchase(transactionHead: TransactionHead) {
        return this.http.post(`${environment.apiUrl}transaction/savepurchase`, transactionHead);
    }
    getPurchaseTransactions() {
        return this.http.get<TransactionHead[]>(`${environment.apiUrl}transaction/getpurchasetransactions`);
    }
    getSelectedPurchaseTransaction(id) {
        return this.http.get<TransactionHead>(`${environment.apiUrl}transaction/getselectedpurchasetransaction?id=${id}`);
    }
    updatePurchaseTransaction(transactionHead: TransactionHead) {
        return this.http.post(`${environment.apiUrl}transaction/updatepurchasetransaction`, transactionHead);
    }
    saveNewService(transactionHead: TransactionHead) {
        return this.http.post(`${environment.apiUrl}transaction/saveservice`, transactionHead);
    }
    getServiceTransactions() {
        return this.http.get<TransactionHead[]>(`${environment.apiUrl}transaction/getservicetransactions`);
    }
    getSelectedServiceTransaction(id) {
        return this.http.get<TransactionHead>(`${environment.apiUrl}transaction/getselectedservicetransaction?id=${id}`);
    }
}