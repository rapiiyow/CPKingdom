import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Module } from 'src/app/models/modules.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.authService.navmenuVisible.next(false);
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getErrorMessage(field: string) {
    if (this.loginForm.controls[field].hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }

    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(map(val => {
        var currentModules: Array<Module> = val.details.modules;
        var filteredModules = [];

        var mappedModules: Array<Module> = currentModules.map((module: Module) => {
          return {
            ...module,
            submodules: currentModules.filter(mod => module.moduleId === mod.parentId)
          }
        })


        mappedModules.map((module: Module) => {
          //check if the module is child
          var childModule = mappedModules.findIndex(mm => mm.submodules.findIndex(sm => sm.moduleId === module.moduleId) !== -1)

          if(childModule === -1) {
            filteredModules.push(module)
          }
        })

        return {
          token: val.token,
          details: {
            ...val.details,
            modules: filteredModules
          }
        };
      })).subscribe(res => {
        this.authService.setToken(res.token);
        this.authService.setModules(res.details.modules);
        this.authService.modules.next(res.details.modules);

        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 800);
      }, error => {
        if (error.status === 404) {
          this.snackBar.open('Invalid credential. Please try again.', 'close', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }
      })
    } else {
      this.snackBar.open('All fields are required.', 'close', {
        duration: 3000,
        verticalPosition: 'top'
      })
    }
  }
}
