import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './item/item-component';
import { BrandComponent } from './brand/brand-component';
import { CategoryComponent } from './category/category-component';
import { SupplierComponent } from './supplier/supplier-component';
import { StaffComponent } from './staff/staff-component';
import { InventoryComponent } from './inventory/inventory-component';

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
        InventoryComponent
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
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
