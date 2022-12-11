import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Inventory } from "../models/inventory";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private http: HttpClient) { }
    getReorderPoint() {
        return this.http.get<Inventory[]>(`${environment.apiUrl}inventory/getreorderpoint`);
    }
    getTransactionDashboard() {
        return this.http.get<any>(`${environment.apiUrl}transaction/gettransactiondashboard`);
    }
}