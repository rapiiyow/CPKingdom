import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Item } from "../models/item";
import { JResponse } from "../models/JResponse";
import { ItemService } from "./item-service";

@Component({
    selector: 'item-component',
    styleUrls: ['./item-component.css'],
    templateUrl: './item-component.html'
})
export class ItemComponent {
    categories: Category[];
    brands: Brand[];
    displayedColumns: string[] = ['actions', 'brandName', 'name', 'description', 'srp'];
    dataSource: any = [];
    itemModel: Item = new Item();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    descriptionFilter = new FormControl('');
    filterValues = new Item();
    constructor(private modalService: NgbModal, private itemService: ItemService, private cdf: ChangeDetectorRef) {
        this.getItems();
        this.getCategories();
        this.getBrands();
    }
    getCategories() {
        this.itemService.getCategories().subscribe(res => {
            this.categories = res;
        });
    }
    getBrands() {
        this.itemService.getBrands().subscribe(res => {
            this.brands = res;
        });
    }
    getItems() {
        this.itemService.getItems().subscribe(res => {
            this.dataSource = new MatTableDataSource<Item>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick(content) {
        this.itemModel = new Item();
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onSaveItemClick() {
        if (this.itemModel.id <= 0) {
            this.itemService.saveNewItem(this.itemModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getItems();
                    this.itemModel = new Item();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new item.');
                }
            });
        } else {
            this.itemService.updateItem(this.itemModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getItems();
                    this.itemModel = new Item();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update item.');
                }
            });
        }
    }
    onEditClick(_item: Item, content) {
        this.itemModel = _item;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
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