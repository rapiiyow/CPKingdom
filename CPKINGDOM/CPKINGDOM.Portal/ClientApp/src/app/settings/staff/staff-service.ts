import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Role } from "../../models/role";
import { Staff } from "../../models/staff";

@Injectable({ providedIn: 'root' })
export class StaffService {
    constructor(private http: HttpClient) { }
    getRoles() {
        return this.http.get<Role[]>(`${environment.apiUrl}item/getroles`);
    }
    getStaffs() {
        return this.http.get<Staff[]>(`${environment.apiUrl}item/getstaffs`);
    }
    saveNewStaff(staff: Staff) {
        return this.http.post(`${environment.apiUrl}item/savenewstaff`, staff);
    }
    updateStaff(staff: Staff) {
        return this.http.post(`${environment.apiUrl}item/updatestaff`, staff);
    }
}