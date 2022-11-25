import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = true;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;

    transactionShowSubChild: boolean = false;
    transactionShowUp: boolean = false;

    settingShowSubChild: boolean = false;
    settingShowUp: boolean = false;

    reportShowSubChild: boolean = false;
    reportShowUp: boolean = false;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }

    mouseenter() {
        if (!this.isExpanded) {
            this.isShowing = true;
        }
    }

    mouseleave() {
        if (!this.isExpanded) {
            this.isShowing = false;
        }
    }
    liClick = () => {

        this.transactionShowSubChild = !this.transactionShowSubChild;
        this.transactionShowUp = this.transactionShowSubChild;
        //this.closeOptionBar();
    }
    liClickSettings = () => {

        this.settingShowSubChild = !this.settingShowSubChild;
        this.settingShowUp = this.settingShowSubChild;
    }
    liClickReport = () => {

        this.reportShowSubChild = !this.reportShowSubChild;
        this.reportShowUp = this.reportShowSubChild;
    }
}
