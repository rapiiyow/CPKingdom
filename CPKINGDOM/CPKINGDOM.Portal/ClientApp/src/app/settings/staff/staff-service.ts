import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../../models/role";
import { Staff } from "../../models/staff";

@Injectable({ providedIn: 'root' })
export class StaffService {
    constructor(private http: HttpClient) { }
    getRoles() {
        return this.http.get<Role[]>(`item/getroles`);
    }
    getStaffs() {
        return this.http.get<Staff[]>(`item/getstaffs`);
    }
    saveNewStaff(staff: Staff) {
        return this.http.post(`item/savenewstaff`, staff);
    }
    updateStaff(staff: Staff) {
        return this.http.post(`item/updatestaff`, staff);
    }
}