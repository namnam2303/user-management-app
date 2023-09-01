import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { Subscription } from 'rxjs'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  showLoading: boolean = false;
  hide: boolean = true;
  private subcriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.subcriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.showLoading = false;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onLogin(user: User): void {
    if (this.loginForm.valid) {
      this.subcriptions.push(
        this.authenticationService.login(user).subscribe(
          (response: HttpResponse<User>) => {
            this.showLoading = true;
            let token = response.headers.get('Jwt-Token');
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(response.body);
            this.toastr.success("Logged in successfully");
            this.router.navigateByUrl('/user/management');
          },
          (errorResponse: HttpErrorResponse) => {
            this.toastr.error(errorResponse.error.message || 'An Error is occured');
          }
        ))
    }
  }

}
