import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../models/item';
import { ReportService } from '../report-service';

@Component({
    selector: 'app-inventory-log',
    templateUrl: './inventory-log.component.html',
    styleUrls: ['./inventorylog.css']
})
export class InventoryLogComponent implements OnInit {
    inventoryLog: any[];
    items: Item[];
    selectedItem: Item = new Item();
    constructor(private modalService: NgbModal, private reportService: ReportService) { }

    ngOnInit() {
        this.reportService.getItems().subscribe(res => {
            this.items = res;
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
    getTotalQuantity() {
        if (typeof this.inventoryLog !== 'undefined') {
            const stockIn = this.inventoryLog.filter(a => a.stockType === 'IN');
            const totalStockIn = stockIn.map(a => a.quantity).reduce((a, b) => a + b, 0);

            const stockOut = this.inventoryLog.filter(a => a.stockType === 'OUT');
            const totalStockOut = stockOut.map(a => a.quantity).reduce((a, b) => a + b, 0);
            return totalStockIn - totalStockOut;
        }        
    }
    onChange() {
        this.reportService.getItemInventoryLog(this.selectedItem.id).subscribe(res => {
            this.inventoryLog = res;
        });
    }
}
