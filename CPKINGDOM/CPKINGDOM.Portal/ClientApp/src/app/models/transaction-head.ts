import { Inventory } from "./inventory";

export class TransactionHead {
    id: number;
    transactionNo: string;
    customerName: string;
    customerContactNo: string;
    notes: string;
    technician: number;
    status: string;
    isService: boolean;
    serviceFee: number;
    createdBy: number;
    createdDate: Date;
    inventory: Inventory[];
    totalAmount: number;
    totalPaid: number;
    tranDateTime: Date;
    staffName: string;
    constructor() {
        this.id = 0;
        this.transactionNo = '';
        this.customerName = '';
        this.customerContactNo = '';
        this.notes = '';
        this.technician = 0;
        this.status = '';
        this.isService = false;
        this.serviceFee = 0;
        this.createdBy = 0;
        this.createdDate = new Date();
        this.inventory = [];
        this.totalAmount = 0;
        this.totalPaid = 0;
        this.tranDateTime = new Date();
        this.staffName = '';
    }
}