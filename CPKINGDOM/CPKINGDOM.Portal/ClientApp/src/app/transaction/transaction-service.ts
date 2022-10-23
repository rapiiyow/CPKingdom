import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Inventory } from "../models/inventory";
import { JResponse } from "../models/JResponse";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class TransactionService {
    constructor(private http: HttpClient) { }
    getPurchaseNo() {
        return this.http.get<JResponse>(`transaction/getpurchaseno`);
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
    //getBrands() {
    //    return this.http.get<Brand[]>(`inventory/getbrands`);
    //}
    //getInventories() {
    //    return this.http.get<Inventory[]>(`inventory/getinventories`);
    //}
    //saveNewInventory(inventory: Inventory) {
    //    return this.http.post(`inventory/saveinventory`, inventory);
    //}
    //updateInventory(inventory: Inventory) {
    //    return this.http.post(`inventory/updateinventory`, inventory);
    //}
    //getSuppliers() {
    //    return this.http.get<Supplier[]>(`item/getsuppliers`);
    //}
    //getItemInventory(itemId) {
    //    return this.http.get<Inventory[]>(`inventory/getiteminventory?itemId=${itemId}`);
    //}
}