import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReorderPointComponent } from './reports/reorder-point/reorder-point';
import { UnpaidPurchaseComponent } from './reports/unpaid-purchase/unpaid-purchase';
import { UnpaidServiceComponent } from './reports/unpaid-service/unpaid-service';
import { TechnicianMonitoringComponent } from './technician/technician-monitoring';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/service/auth.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ModuleGuard } from './shared/guard/module.guard';
import { NotFoundComponent } from './not-found/not-found.component';
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
        ServiceDetailComponent,
        ReorderPointComponent,
        UnpaidPurchaseComponent,
        UnpaidServiceComponent,
        TechnicianMonitoringComponent,
        LoginComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: 'auth/login', component: LoginComponent},

            { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard, ModuleGuard] },
            { path: 'item', component: ItemComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'brand', component: BrandComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'category', component: CategoryComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'staff', component: StaffComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'purchasedetail/:id', component: PurchaseDetailComponent },
            { path: 'service', component: ServiceComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'servicedetail/:id', component: ServiceDetailComponent },
            { path: 'reorderpoint', component: ReorderPointComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'unpaidpurchase', component: UnpaidPurchaseComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'unpaidservice', component: UnpaidServiceComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: 'technician', component: TechnicianMonitoringComponent, canActivate: [AuthGuard, ModuleGuard] },
            { path: '404', component: NotFoundComponent},
            { path: '**', redirectTo: '404' }
        ]),
        BrowserAnimationsModule,
        NgbModalModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        SharedModule
    ],
    providers: [
        AuthService, 
        AuthGuard,
        ModuleGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
