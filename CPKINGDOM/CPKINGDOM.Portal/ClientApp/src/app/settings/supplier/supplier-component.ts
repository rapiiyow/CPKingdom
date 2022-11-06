import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Supplier } from "../../models/supplier";
import { JResponse } from "../../models/JResponse";
import { SupplierService } from "./supplier-service";

@Component({
    selector: 'supplier-component',
    styleUrls: ['./supplier-component.css'],
    templateUrl: './supplier-component.html'
})
export class SupplierComponent {
    displayedColumns: string[] = ['actions', 'name', 'contactPerson', 'contactNo', 'address'];
    dataSource: any = [];
    supplierModel: Supplier = new Supplier();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Supplier();
    constructor(private modalService: NgbModal, private supplierService: SupplierService, private cdf: ChangeDetectorRef) {
        this.getSuppliers();
    }
    getSuppliers() {
        this.supplierService.getSuppliers().subscribe(res => {
            this.dataSource = new MatTableDataSource<Supplier>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick(content) {
        this.supplierModel = new Supplier();
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onSaveSupplierClick() {
        if (this.supplierModel.id <= 0) {
            this.supplierService.saveNewSupplier(this.supplierModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getSuppliers();
                    this.supplierModel = new Supplier();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new supplier.');
                }
            });
        } else {
            this.supplierService.updateSupplier(this.supplierModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getSuppliers();
                    this.supplierModel = new Supplier();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update supplier.');
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
    onEditClick(_supplier: Supplier, content) {
        this.supplierModel = _supplier;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}