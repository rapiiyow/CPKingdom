import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Inventory } from "../../models/inventory";
import { TransactionHead } from "../../models/transaction-head";
import { ReportService } from "../report-service";

@Component({
    selector: 'unpaid-service',
    /*styleUrls: ['./reorder-point.css'],*/
    templateUrl: './unpaid-service.html'
})
export class UnpaidServiceComponent implements OnInit {
    modalRef: NgbModalRef;
    transactions: TransactionHead[];
    constructor(private modalService: NgbModal, private reportService: ReportService) {
    }
    ngOnInit(): void {
        this.reportService.getUnpaidService().subscribe(res => {
            this.transactions = res;
        });
    }

    onPrint = () => {
        const printContent = document.getElementById("print").innerHTML;
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.opacity = "0";
        document.body.appendChild(frame1);

        var frameDoc = frame1.contentWindow.document
        frameDoc.open();

        frameDoc.write('<!DOCTYPE html>');
        frameDoc.write('<html><head>');
        frameDoc.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
        frameDoc.write('</head><body>');
        frameDoc.write(printContent);
        frameDoc.write('</body></html>');
        frameDoc.close();

        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);
    }
}