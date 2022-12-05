import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Module } from 'src/app/models/modules.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorage: Storage;
  public navmenuVisible = new BehaviorSubject<boolean>(false);
  public modules = new BehaviorSubject<Module[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.localStorage = window.localStorage;
  }

  login(user) {
    return this.http.post<any>(`api/auth/Login`, user);
  }

  logout(): void {
    this.localStorage.clear();
    this.navmenuVisible.next(false);
    this.modules.next([]);
    // Reload the app
    // window.location.href = SITE_LINKS.AUTH.LOGIN;
    this.router.navigateByUrl('/auth/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.getItem('CpKingdom');
  }

  getToken(): string {
    return this.localStorage.getItem('CpKingdom');
  }

  setToken(value) {
    this.localStorage.setItem('CpKingdom', value);
  }

  removeToken() {
    this.localStorage.removeItem('CpKingdom');
  }

  getModules() {
    return JSON.parse(this.localStorage.getItem('cpkModules'))
  }

  setModules(modules) {
    this.localStorage.setItem('cpkModules', JSON.stringify(modules))
  }
}
