import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";
import { ToastrService } from "ngx-toastr";


@Injectable({providedIn : 'root'})
export class AuthenticationGuard implements CanActivate{
    constructor(private authenticationService : AuthenticationService,
        private router : Router,
        private toast : ToastrService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isUserLoggedIn();
    }

    private isUserLoggedIn() : boolean {
        if(this.authenticationService.isUserLoggedIn()) {
            return true;
        }
        this.router.navigateByUrl('/login');
        this.toast.error('You need to login to access this page');
        return false;
    }
}
