import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TransactionHead } from "../../models/transaction-head";
import { TransactionService } from "../transaction-service";
@Component({
    selector: 'purchase-component',
    styleUrls: ['./purchase-component.css'],
    templateUrl: './purchase-component.html'
})
export class PurchaseComponent {
    displayedColumns: string[] = ['actions', 'transactionNo', 'createdDate', 'customerName', 'customerContactNo', 'totalAmount', 'totalPaid', 'status'];
    dataSource: any = [];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    constructor(private modalService: NgbModal, private transactionService: TransactionService, private router: Router) {
        this.getPurchaseTransactions();
    }

    getPurchaseTransactions() {
        this.transactionService.getPurchaseTransactions().subscribe(res => {
            this.dataSource = new MatTableDataSource<TransactionHead>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick() {
        let ID = 0;
        this.router.navigate(['/purchasedetail', ID]);
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onEditClick(id) {
        let ID = id;
        this.router.navigate(['/purchasedetail', ID]);
    }
}