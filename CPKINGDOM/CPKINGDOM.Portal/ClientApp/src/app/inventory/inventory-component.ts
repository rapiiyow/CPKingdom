import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Brand } from "../models/brand";
import { Category } from "../models/category";
import { Inventory } from "../models/inventory";
import { JResponse } from "../models/JResponse";
import { Supplier } from "../models/supplier";
import { InventoryService } from "./inventory-service";

@Component({
    selector: 'inventory-component',
    styleUrls: ['./inventory-component.css'],
    templateUrl: './inventory-component.html'
})
export class InventoryComponent implements OnInit {
    categories: Category[];
    brands: Brand[];
    suppliers: Supplier[] = [];
    displayedColumns: string[] = ['actions', 'barcode', 'brandName', 'itemName', 'description', 'srp', 'qtyAvailable'];
    displayedItemInventoryColumns: string[] = ['actions', 'dateReceived', 'supplierName', 'costPrice', 'qtyReceived', 'qtyAvailable'];
    dataSource: any = [];
    inventoryModel: Inventory = new Inventory();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('iteminventory', { static: false }) itemInventorypaginator: MatPaginator;
    modalRef: NgbModalRef;
    modalInventoryRef: NgbModalRef;

    barcodeFilter = new FormControl('');
    categoryFilter = new FormControl('');
    brandFilter = new FormControl('');
    itemNameFilter = new FormControl('');
    descriptionFilter = new FormControl('');

    filterValues = new Inventory();

    stockInModel = new Inventory();
    inventories: any = [];

    constructor(private modalService: NgbModal, private inventoryService: InventoryService, private cdf: ChangeDetectorRef) {
        this.getInventories();
        this.getSuppliers();
    }
    ngOnInit(): void {
        this.barcodeFilter.valueChanges
            .subscribe(
                barcode => {
                    this.filterValues.barcode = barcode;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.brandFilter.valueChanges
            .subscribe(
                brandName => {
                    this.filterValues.brandName = brandName;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.itemNameFilter.valueChanges
            .subscribe(
                itemName => {
                    this.filterValues.itemName = itemName;
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
    getSuppliers() {
        this.inventoryService.getSuppliers().subscribe(res => {
            this.suppliers = res;
        });
    }
    getInventories() {
        this.inventoryService.getInventories().subscribe(res => {
            this.dataSource = new MatTableDataSource<Inventory>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.createFilter();
        });
    }
    onViewItemsClick(itemId, content) {
        this.inventoryService.getItemInventory(itemId).subscribe(res => {

            this.inventories = new MatTableDataSource<Inventory>(res);
            this.inventories.paginator = this.itemInventorypaginator;

            this.modalInventoryRef = this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false });
        });
    }
    onSaveItemClick() {
        this.inventoryService.saveNewInventory(this.stockInModel).subscribe((res: JResponse) => {
            if (res.success) {
                this.getInventories();
                this.stockInModel = new Inventory();
                this.onCloseModal();
            }
            else {
                alert('Failed to add new inventory.');
            }
        });
    }
    onSaveInventoryClick() {
        if (this.inventoryModel.id <= 0) {
            this.inventoryService.saveNewInventory(this.inventoryModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getInventories();
                    this.inventoryModel = new Inventory();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to add new inventory.');
                }
            });
        } else {
            this.inventoryService.updateInventory(this.inventoryModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getInventories();
                    this.inventoryModel = new Inventory();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update inventory.');
                }
            });
        }
    }
    createFilter(): (data: any, filter: string) => boolean {
        let filterFunction = function (data, filter): boolean {
            let searchTerms = JSON.parse(filter);
            return data.barcode.toLowerCase().indexOf(searchTerms.barcode) !== -1
                && data.brandName.toString().toLowerCase().indexOf(searchTerms.brandName) !== -1
                && data.itemName.toString().toLowerCase().indexOf(searchTerms.itemName) !== -1
                && data.description.toString().toLowerCase().indexOf(searchTerms.description) !== -1;

        }
        return filterFunction;
    }
    onAddQtyClick(_inventory: Inventory, content) {
        this.stockInModel = _inventory;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onCloseModal() {
        this.modalRef.close();
    }
}