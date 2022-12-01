import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Staff } from "../../models/staff";
import { JResponse } from "../../models/JResponse";
import { StaffService } from "./staff-service";
import { Role } from "../../models/role";

@Component({
    selector: 'staff-component',
    styleUrls: ['./staff-component.css'],
    templateUrl: './staff-component.html'
})
export class StaffComponent {
    roles: Role[];
    displayedColumns: string[] = ['actions', 'fullName', 'address', 'contactNo', 'roleName'];
    dataSource: any = [];
    staffModel: Staff = new Staff();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Staff();
    constructor(private modalService: NgbModal, private staffService: StaffService, private cdf: ChangeDetectorRef) {
        this.getRoles();
        this.getStaffs();
    }
    getRoles() {
        this.staffService.getRoles().subscribe(res => {
            this.roles = res;
        });
    }
    getStaffs() {
        this.staffService.getStaffs().subscribe(res => {
            this.dataSource = new MatTableDataSource<Staff>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick(content) {
        this.staffModel = new Staff();
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onSaveStaffClick() {
        if (this.staffModel.id <= 0) {
            this.staffService.saveNewStaff(this.staffModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getStaffs();
                    this.staffModel = new Staff();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new staff.');
                }
            });
        } else {
            this.staffService.updateStaff(this.staffModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getStaffs();
                    this.staffModel = new Staff();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update staff.');
                }
            });
        }
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onEditClick(_staff: Staff, content) {
        this.staffModel = _staff;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}