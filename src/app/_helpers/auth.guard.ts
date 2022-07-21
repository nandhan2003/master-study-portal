import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const token = this.https;

        var token = localStorage.getItem('token')
        if (localStorage.getItem('token')) {
          return true;
        }else if(token === "Token Error") {
          this.router.navigate( ['/admin']);
          return false;
        }

      }
}
