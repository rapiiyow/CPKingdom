import { OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Inventory } from "../../../models/inventory";
import { JResponse } from "../../../models/JResponse";
import { TransactionHead } from "../../../models/transaction-head";
import { TransactionService } from "../../transaction-service";
@Component({
    selector: 'purchasedetail-component',
    styleUrls: ['./purchasedetail-component.css'],
    templateUrl: './purchasedetail-component.html'
})
export class PurchaseDetailComponent implements OnInit {
    modalRef: NgbModalRef;
    availableItemModalRef: NgbModalRef;
    headModel: TransactionHead = new TransactionHead();
    displayedColumns: string[] = ['actions', 'brandName', 'itemName', 'description', 'costPrice', 'srp', 'qtyPurchased', 'lineTotal', 'balance', 'amountPaid'];
    availableItemDisplayedColumns: string[] = ['actions', 'barcode', 'qtyAvailable', 'brandName', 'itemName', 'description', 'supplierName', 'costPrice', 'srp'];
    dataSource: any = [];

    selectedItems: Inventory[] = [];

    barcodeFilter = new FormControl('');
    categoryFilter = new FormControl('');
    brandFilter = new FormControl('');
    itemNameFilter = new FormControl('');
    descriptionFilter = new FormControl('');
    filterValues = new Inventory();

    availableItems: any = [];
    @ViewChild('iteminventory', { static: false }) itemInventorypaginator: MatPaginator;
    @ViewChild('matSortAvailable', { static: false }) sort: MatSort;
    ID: any;

    totalBalance: number = 0;
    transactionStatus: string = '';
    originalPaid: number = 0;
    constructor(private modalService: NgbModal, private transactionService: TransactionService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.ID = activatedRoute.snapshot.paramMap.get('id');
        this.getAvailableItems();
    }

    ngOnInit(): void {
        if (this.ID > 0) {
            this.transactionService.getSelectedPurchaseTransaction(this.ID).subscribe(res => {
                this.headModel = res;
                this.selectedItems = res.inventory;
                this.originalPaid = res.inventory.map(t => t.amountPaid).reduce((acc, value) => acc + value, 0);
            });
        } else {
            this.transactionService.getPurchaseNo().subscribe(res => {
                this.headModel = new TransactionHead();
                this.headModel.transactionNo = res.data;
            });
        }
    }
    getAvailableItems() {
        this.transactionService.getAvailableItems().subscribe(res => {
            this.availableItems = new MatTableDataSource<Inventory>(res);
            this.availableItems.paginator = this.itemInventorypaginator;
            this.availableItems.sort = this.sort;
        });
    }
    onAddItem(content) {
        this.getAvailableItems();
        this.availableItemModalRef = this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false });
    }

    onCloseClicked() {
        this.router.navigateByUrl('/purchase');
    }
    addSelectedItem(_selectedItem: Inventory) {
        _selectedItem.qtyPurchased = 1;
        _selectedItem.amountPaid = 0;
        var _item = this.selectedItems.filter(a => a.id == _selectedItem.id);

        if (_item.length <= 0) {
            this.selectedItems = [...this.selectedItems, _selectedItem];
            alert('Successfully added');
        }
        else {
            alert('Item already added')
        }

    }
    removeSelectedItem(item: Inventory) {
        this.selectedItems = this.selectedItems.filter(a => a.id !== item.id);
    }
    getTotalCost() {
        var totalCost = this.selectedItems.map(t => (t.srp * t.qtyPurchased)).reduce((acc, value) => acc + value, 0);
        return totalCost;
    }
    getTotalBalance() {
        var balance = this.selectedItems.map(t => ((t.srp * t.qtyPurchased) - t.amountPaid)).reduce((acc, value) => acc + value, 0);
        this.totalBalance = balance;
        return balance;
    }
    getTotalPaid() {
        var paid = this.selectedItems.map(t => t.amountPaid).reduce((acc, value) => acc + value, 0);

        if (paid === 0) {
            this.transactionStatus = 'Unpaid';
        } else if (paid > 0 && this.totalBalance > 0) {
            this.transactionStatus = 'Partial Payment';
        } else if (paid > 0 && this.totalBalance <= 0) {
            this.transactionStatus = 'Paid';
        }
        return paid;
    }
    onSavePurchase(_headModel: TransactionHead, _selectedItems: Inventory[]) {
        var _transactionHead = _headModel;
        _transactionHead.inventory = _selectedItems;
        _transactionHead.status = this.transactionStatus;
        if (this.ID <= 0) {
            if (_selectedItems.length > 0) {                
                this.transactionService.saveNewPurchase(_transactionHead).subscribe((res: JResponse) => {
                    if (res.success) {
                        alert(res.message);
                        this.onCloseClicked();
                    }
                    else {
                        alert('Failed to save transaction.');
                    }
                });
            } else {
                alert('Please add an item');
            }
        } else {
            this.transactionService.updatePurchaseTransaction(_transactionHead).subscribe((res: JResponse) => {
                if (res.success) {
                    alert(res.message);
                    this.onCloseClicked();
                }
                else {
                    alert('Failed to save transaction.');
                }
            });
        }
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.availableItems.filter = filterValue.trim().toLowerCase();

        if (this.availableItems.paginator) {
            this.availableItems.paginator.firstPage();
        }
    }
}