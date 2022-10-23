import { Component, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TransactionHead } from "../../models/transaction-head";
import { TransactionService } from "../transaction-service";
@Component({
    selector: 'service-component',
    styleUrls: ['./service-component.css'],
    templateUrl: './service-component.html'
})
export class ServiceComponent {
    displayedColumns: string[] = ['actions', 'transactionNo', 'createdDate', 'customerName', 'customerContactNo', 'totalAmount', 'totalPaid', 'status'];
    dataSource: any = [];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    constructor(private modalService: NgbModal, private transactionService: TransactionService, private router: Router) {
        this.getServiceTransactions();
    }

    getServiceTransactions() {
        this.transactionService.getServiceTransactions().subscribe(res => {
            this.dataSource = new MatTableDataSource<TransactionHead>(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    onNewClick() {
        let ID = 0;
        this.router.navigate(['/servicedetail', ID]);
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onEditClick(id) {
        debugger;
        let ID = id;
        this.router.navigate(['/servicedetail', ID]);
    }
}