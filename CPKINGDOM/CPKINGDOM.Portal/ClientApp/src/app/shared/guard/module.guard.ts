import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Module } from 'src/app/models/modules.model';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var modules: Array<Module> = this.authService.getModules();

    if (!modules) {
      this.authService.removeToken();
      this.router.navigateByUrl('/auth/login');
    } else if(modules.findIndex((module: Module) => module.route === state.url) === -1) {
      this.router.navigateByUrl(modules[0].route);
    }

    this.authService.modules.next(modules)
    return true;
  }

}
