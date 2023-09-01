import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  showLoading : boolean = false;
  registerForm : FormGroup;
  private subcriptions : Subscription[] = [];
  constructor(private formBuilder : FormBuilder,
    private toast : ToastrService,
    private authenticationService : AuthenticationService,
    private router : Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username : ['', Validators.required],
      lastName : ['', Validators.required],
      firstName : ['', Validators.required],
      email : ['', [Validators.required, Validators.pattern('^([a-zA-Z]+[0-9]*\.)+@[a-zA-Z]+([\.]+[a-zA-Z]+){1,4}$')]]
    });
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(sub => {
      sub.unsubscribe();
    })
    
  }
  onRegister(user : User) {
    if(this.registerForm.valid) {
      this.showLoading = true;
      this.subcriptions.push(
        this.authenticationService.register(user).subscribe(
          (response : User) => {
            this.toast.success(`A new account was created for ${response.firstName}.
            Please check your email for password to log in.`);
            this.router.navigateByUrl('/login');
          },
          (errorResponse: HttpErrorResponse) => {
            this.toast.error(errorResponse.error.message);
            this.showLoading = false;
          }
        ));
    }
  }

}
