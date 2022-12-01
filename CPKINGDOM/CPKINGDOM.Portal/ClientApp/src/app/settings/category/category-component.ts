import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../../models/category";
import { JResponse } from "../../models/JResponse";
import { CategoryService } from "./category-service";

@Component({
    selector: 'category-component',
    styleUrls: ['./category-component.css'],
    templateUrl: './category-component.html'
})
export class CategoryComponent {
    displayedColumns: string[] = ['actions', 'name'];
    dataSource: any = [];
    categoryModel: Category = new Category();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    filterValues = new Category();
    constructor(private modalService: NgbModal, private categoryService: CategoryService, private cdf: ChangeDetectorRef) {
        this.getCategories();
    }
    getCategories() {
        this.categoryService.getCategories().subscribe(res => {
            this.dataSource = new MatTableDataSource<Category>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
    onEditClick(_category: Category, content) {
        this.categoryModel = _category;
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