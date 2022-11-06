import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Inventory } from "../models/inventory";
import { JResponse } from "../models/JResponse";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class TransactionService {
    constructor(private http: HttpClient) {

    }
    getPurchaseNo() {
        return this.http.get<JResponse>(`transaction/getpurchaseno`);
    }
    getServiceNo() {
        return this.http.get<JResponse>(`transaction/getserviceno`);
    }
    getTechnicians() {
        return this.http.get<JResponse>(`transaction/gettechnicians`);
    }
    getAvailableItems() {
        return this.http.get<Inventory[]>(`inventory/getavailableitems`);
    }
    saveNewPurchase(transactionHead: TransactionHead) {
        return this.http.post(`transaction/savepurchase`, transactionHead);
    }
    getPurchaseTransactions() {
        return this.http.get<TransactionHead[]>(`transaction/getpurchasetransactions`);
    }
    getSelectedPurchaseTransaction(id) {
        return this.http.get<TransactionHead>(`transaction/getselectedpurchasetransaction?id=${id}`);
    }
    updatePurchaseTransaction(transactionHead: TransactionHead) {
        return this.http.post(`transaction/updatepurchasetransaction`, transactionHead);
    }
    saveNewService(transactionHead: TransactionHead) {
        return this.http.post(`transaction/saveservice`, transactionHead);
    }
    getServiceTransactions() {
        return this.http.get<TransactionHead[]>(`transaction/getservicetransactions`);
    }
    getSelectedServiceTransaction(id) {
        return this.http.get<TransactionHead>(`transaction/getselectedservicetransaction?id=${id}`);
    }
}