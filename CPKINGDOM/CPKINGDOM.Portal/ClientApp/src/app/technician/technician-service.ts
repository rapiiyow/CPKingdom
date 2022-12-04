import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { JResponse } from "../models/JResponse";
import { TransactionHead } from "../models/transaction-head";

@Injectable({ providedIn: 'root' })
export class TechnicianService {
    constructor(private http: HttpClient) {

    }
    getTechnicians() {
        return this.http.get<JResponse>(`${environment.apiUrl}transaction/gettechnicians`);
    }
    getTechnicianTransactions(staffId, fromDate, toDate) {
        return this.http.get<TransactionHead[]>(`${environment.apiUrl}transaction/gettechniciantransaction?staffId=${staffId}&fromDate=${fromDate}&toDate=${toDate}`);
    }
}