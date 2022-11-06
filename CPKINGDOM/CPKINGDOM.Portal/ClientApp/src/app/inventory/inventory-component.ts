﻿import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
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
export class InventoryComponent {
    categories: Category[];
    brands: Brand[];
    suppliers: Supplier[] = [];
    displayedColumns: string[] = ['actions', 'barcode', 'brandName', 'itemName', 'description', 'srp', 'qtyAvailable'];
    displayedItemInventoryColumns: string[] = ['actions', 'dateReceived', 'supplierName', 'costPrice', 'qtyReceived', 'qtyAvailable'];
    dataSource: any = [];
    inventoryModel: Inventory = new Inventory();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('iteminventory', { static: false }) itemInventorypaginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
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

    selectedItem: Inventory;

    originalReceivedQty: number;

    constructor(private modalService: NgbModal, private inventoryService: InventoryService, private cdf: ChangeDetectorRef) {
        this.getInventories();
        this.getSuppliers();
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
            this.dataSource.sort = this.sort;
        });
    }
    onViewItemsClick(item, content) {
        this.selectedItem = item;
        this.inventoryService.getItemInventory(item.itemId).subscribe(res => {

            this.inventories = new MatTableDataSource<Inventory>(res);
            this.inventories.paginator = this.itemInventorypaginator;

            this.modalInventoryRef = this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false });
        });
    }
    onSaveItemClick() {
        if (this.stockInModel.id <= 0) {
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
        } else {
            var _qtyStockOut = this.originalReceivedQty - this.stockInModel.qtyAvailable;
            this.stockInModel.qtyAvailable = this.stockInModel.qtyReceived - _qtyStockOut;
            this.inventoryService.updateInventory(this.stockInModel).subscribe((res: JResponse) => {
                if (res.success) {
                    this.getInventories();
                    this.stockInModel = new Inventory();
                    this.onCloseModal();
                }
                else {
                    alert('Failed to update inventory.');
                }
            });
        }        
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
    onAddQtyClick(_inventory: Inventory, content) {
        this.stockInModel = _inventory;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    }
    onEditClick(_inventory: Inventory, content) {
        this.stockInModel = _inventory;
        this.stockInModel.barcode = this.selectedItem.barcode;
        this.stockInModel.categoryName = this.selectedItem.categoryName;
        this.stockInModel.brandName = this.selectedItem.brandName;
        this.stockInModel.itemName = this.selectedItem.itemName;
        this.stockInModel.description = this.selectedItem.description;
        this.originalReceivedQty = _inventory.qtyReceived;
        this.stockInModel.dateReceived = new Date(_inventory.dateReceived).toLocaleDateString('en-US');
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