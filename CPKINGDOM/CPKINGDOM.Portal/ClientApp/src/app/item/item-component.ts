import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../models/category";
import { Item } from "../models/item";
import { JResponse } from "../models/JResponse";
import { ItemService } from "./item-service";

@Component({
    selector: 'item-component',
    styleUrls: ['./item-component.css'],
    templateUrl: './item-component.html'
})
export class ItemComponent implements OnInit {
    categories: Category[];
    selectedCategory: Category;
    displayedColumns: string[] = ['actions', 'categoryName', 'name', 'description', 'srp'];
    dataSource: any = [];
    itemModel: Item = new Item();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    modalRef: NgbModalRef;
    nameFilter = new FormControl('');
    descriptionFilter = new FormControl('');
    filterValues = new Item();
    constructor(private modalService: NgbModal, private itemService: ItemService, private cdf: ChangeDetectorRef) {
        this.getItems();
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
        this.descriptionFilter.valueChanges
            .subscribe(
                description => {
                    this.filterValues.description = description;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
    }
    getCategories() {
        this.itemService.getCategories().subscribe(res => {
            this.categories = res;
        });
    }
    getItems() {
        this.itemService.getItems().subscribe(res => {
            this.dataSource = new MatTableDataSource<Item>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.createFilter();
        });
    }
    onNewClick(content) {
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onSaveItemClick() {
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
    }
    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data, filter): boolean {
            let searchTerms = JSON.parse(filter);
            return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
                && data.description.toString().toLowerCase().indexOf(searchTerms.description) !== -1;
        }
        return filterFunction;
    }
    onEditClick(_item: Item, content) {
        this.itemModel = _item;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}