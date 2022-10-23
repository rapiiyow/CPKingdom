import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../../models/category";
import { JResponse } from "../../models/JResponse";
import { CategoryService } from "./category-service";

@Component({
    selector: 'category-component',
    styleUrls: ['./category-component.css'],
    templateUrl: './category-component.html'
})
export class CategoryComponent implements OnInit {
    displayedColumns: string[] = ['actions', 'name'];
    dataSource: any = [];
    categoryModel: Category = new Category();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Category();
    constructor(private modalService: NgbModal, private categoryService: CategoryService, private cdf: ChangeDetectorRef) {
        this.getCategories();
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
    getCategories() {
        this.categoryService.getCategories().subscribe(res => {
            this.dataSource = new MatTableDataSource<Category>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.createFilter();
        });
    }
    onNewClick(content) {
        this.categoryModel = new Category();
        this.modalRef = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }
    onSaveCategoryClick() {
        if (this.categoryModel.id <= 0) {
            this.categoryService.saveNewCategory(this.categoryModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getCategories();
                    this.categoryModel = new Category();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new category.');
                }
            });
        } else {
            this.categoryService.updateCategory(this.categoryModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getCategories();
                    this.categoryModel = new Category();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update category.');
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
    onEditClick(_category: Category, content) {
        this.categoryModel = _category;
        this.modalRef = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}