import { Component } from "@angular/core";
import { Staff } from "../models/staff";
import { TransactionHead } from "../models/transaction-head";
import { TechnicianService } from "./technician-service";

@Component({
    selector: 'technician-monitoring',
    styleUrls: ['./technician-monitoring.css'],
    templateUrl: './technician-monitoring.html'
})
export class TechnicianMonitoringComponent {
    staffs: Staff[] = [];
    selectedStaff: Staff = new Staff();
    fromDate: Date;
    toDate: Date;
    showDateText = false;
    transactions: TransactionHead[] = [];
    displayedColumns: string[] = ['transactionNo', 'tranDateTime', 'customerName', 'status', 'totalAmount', 'totalPaid', 'balance'];
    constructor(private techService: TechnicianService) {
        this.getTechnicians();
    }

    getTechnicians() {
        this.techService.getTechnicians().subscribe(res => {
            this.staffs = res.data;
        });
    }
    generateTransactions() {
        if (this.selectedStaff != null && this.selectedStaff.id > 0) {
            if (typeof this.fromDate != 'undefined' && typeof this.toDate != 'undefined') {
                this.showDateText = true;
                this.techService.getTechnicianTransactions(this.selectedStaff.id, this.fromDate, this.toDate).subscribe(res => {
                    this.transactions = res;
                });
            } else {
                alert('Please select a From date and To Date');
            }
        } else {
            alert('Please select a Technician');
        }
    }
    getTotalPaid() {
        var paid = this.transactions.map(t => t.totalPaid).reduce((acc, value) => acc + value, 0);
        return paid;
    }
    getTotalAmount() {
        var amount = this.transactions.map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);
        return amount;
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