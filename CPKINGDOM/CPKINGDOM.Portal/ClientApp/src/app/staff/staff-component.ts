import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Staff } from "../models/staff";
import { JResponse } from "../models/JResponse";
import { StaffService } from "./staff-service";
import { Role } from "../models/role";

@Component({
    selector: 'staff-component',
    styleUrls: ['./staff-component.css'],
    templateUrl: './staff-component.html'
})
export class StaffComponent implements OnInit {
    roles: Role[];
    displayedColumns: string[] = ['actions', 'fullName', 'address', 'contactNo', 'roleName'];
    dataSource: any = [];
    staffModel: Staff = new Staff();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Staff();
    constructor(private modalService: NgbModal, private staffService: StaffService, private cdf: ChangeDetectorRef) {
        this.getRoles();
        this.getStaffs();
    }
    ngOnInit(): void {
        this.nameFilter.valueChanges
            .subscribe(
                name => {
                    this.filterValues.fullName = name;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
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
            this.dataSource.filterPredicate = this.createFilter();
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
    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data, filter): boolean {
            let searchTerms = JSON.parse(filter);
            return data.fullName.toLowerCase().indexOf(searchTerms.fullName) !== -1
        }
        return filterFunction;
    }
    onEditClick(_staff: Staff, content) {
        this.staffModel = _staff;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}