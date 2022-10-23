import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Brand } from "../../models/brand";
import { JResponse } from "../../models/JResponse";
import { BrandService } from "./brand-service";

@Component({
    selector: 'brand-component',
    styleUrls: ['./brand-component.css'],
    templateUrl: './brand-component.html'
})
export class BrandComponent implements OnInit {
    displayedColumns: string[] = ['actions', 'name'];
    dataSource: any = [];
    brandModel: Brand = new Brand();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Brand();
    constructor(private modalService: NgbModal, private brandService: BrandService, private cdf: ChangeDetectorRef) {
        this.getBrands();
    }
    ngOnInit(): void {
        this.nameFilter.valueChanges
            .subscribe(
                name => {
                    this.filterValues.name = name;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
    }
    getBrands() {
        this.brandService.getBrands().subscribe(res => {
            this.dataSource = new MatTableDataSource<Brand>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.createFilter();
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
    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data, filter): boolean {
            let searchTerms = JSON.parse(filter);
            return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
        }
        return filterFunction;
    }
    onEditClick(_brand: Brand, content) {
        this.brandModel = _brand;
        this.modalRef = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}