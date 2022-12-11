import { Component } from '@angular/core';
import { Inventory } from '../models/inventory';
import { DashboardService } from './dashboard-service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    ReorderPoint: number;
    TodayPurchase: number;
    TodayService: number;
    YesterdayPurchase: number;
    YesterdayService: number;
    TotalCollectibles: number;
    transactionCounts: any;
    constructor(private dashboardService: DashboardService) {
        this.dashboardService.getReorderPoint().subscribe(res => {
            this.ReorderPoint = res.length
        });
        this.dashboardService.getTransactionDashboard().subscribe(res => {
            this.TodayPurchase = res.todayPurchase;
            this.TodayService = res.todayService;
            this.YesterdayPurchase = res.yesterdayPurchase;
            this.YesterdayService = res.yesterdayService;
            this.TotalCollectibles = res.totalCollectibles;
        });
    }
}
