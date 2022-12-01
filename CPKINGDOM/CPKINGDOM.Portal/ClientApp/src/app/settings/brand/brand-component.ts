import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Brand } from "../../models/brand";
import { JResponse } from "../../models/JResponse";
import { BrandService } from "./brand-service";

@Component({
    selector: 'brand-component',
    styleUrls: ['./brand-component.css'],
    templateUrl: './brand-component.html'
})
export class BrandComponent {
    displayedColumns: string[] = ['actions', 'name'];
    dataSource: any = [];
    brandModel: Brand = new Brand();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Brand();
    constructor(private modalService: NgbModal, private brandService: BrandService, private cdf: ChangeDetectorRef) {
        this.getBrands();
    }
    getBrands() {
        this.brandService.getBrands().subscribe(res => {
            this.dataSource = new MatTableDataSource<Brand>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick(content) {
        this.brandModel = new Brand();
        this.modalRef = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }
    onSaveBrandClick() {
        if (this.brandModel.id <= 0) {
            this.brandService.saveNewBrand(this.brandModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getBrands();
                    this.brandModel = new Brand();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new brand.');
                }
            });
        } else {
            this.brandService.updateBrand(this.brandModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getBrands();
                    this.brandModel = new Brand();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update brand.');
                }
            });
        }
    }
    onEditClick(_brand: Brand, content) {
        this.brandModel = _brand;
        this.modalRef = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}