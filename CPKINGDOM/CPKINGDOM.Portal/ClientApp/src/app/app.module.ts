import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './item/item-component';
import { InventoryComponent } from './inventory/inventory-component';
import { BrandComponent } from './settings/brand/brand-component';
import { CategoryComponent } from './settings/category/category-component';
import { SupplierComponent } from './settings/supplier/supplier-component';
import { StaffComponent } from './settings/staff/staff-component';
import { PurchaseComponent } from './transaction/purchase/purchase-component';
import { PurchaseDetailComponent } from './transaction/purchase/purchasedetail/purchasedetail-component';
import { ServiceComponent } from './transaction/service/service-component';
import { ServiceDetailComponent } from './transaction/service/servicedetail/servicedetail-component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ItemComponent,
        BrandComponent,
        CategoryComponent,
        SupplierComponent,
        StaffComponent,
        InventoryComponent,
        PurchaseComponent,
        PurchaseDetailComponent,
        ServiceComponent,
        ServiceDetailComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'item', component: ItemComponent },
            { path: 'brand', component: BrandComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'supplier', component: SupplierComponent },
            { path: 'staff', component: StaffComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: 'purchase', component: PurchaseComponent },
            { path: 'purchasedetail/:id', component: PurchaseDetailComponent },
            { path: 'service', component: ServiceComponent },
            { path: 'servicedetail/:id', component: ServiceDetailComponent },
        ]),
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        NgbModalModule,
        MatPaginatorModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSortModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
