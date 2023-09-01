import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../model/user';
import { FileUploadStatus } from '../model/file-upload.status';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public filterUsers: User[];
  public user: User;
  public refreshing: boolean;
  public selectedUser: User;
  public fileName: string;
  public isAdmin: boolean;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editUser = new User();
  private currentUsername: string;
  public fileStatus = new FileUploadStatus();
  public isAdminOrManager: boolean = false;
  public updateForm: FormGroup;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.selectedUser = this.user;
    this.isAdmin = this.user.role === "ROLE_ADMIN" || this.user.role === "ROLE_SUPER_ADMIN";
    this.getUsers();
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z]+[0-9]*\.)+@[a-zA-Z]+([\.]+[a-zA-Z]+){1,4}$')]],
      role: ['', Validators.required],
      fileInput: ['', Validators.required],
      isActive: [''],
      isLocked: ['']
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getUsers() {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUserToLocalCache(response);
          this.users = response;
          this.filterUsers = this.users;
          this.toast.success('Users are loaded successfully!');
        },
        (errorResponse: HttpErrorResponse) => {
          this.toast.error(errorResponse.error.message || 'An error is occured');
        }
      )
    );
    timer(1000).subscribe(() => {
      this.refreshing = false;
    })
  }

  public onSelectUser(user: User): void {
    this.selectedUser = user;
    document.getElementById('userModalBtn').click();
  }

  public onEditUser(user: User) {
    this.editUser = user;
    if (this.user.role === "ROLE_USER") {
      this.toast.error("You don't have authority for this action");
      return;
    }
    document.getElementById('editUserBtn').click();
  }
  public onDeleteUser(username: string) {

  }
  public showUserTable(): void {
    document.getElementById('users-table').style.display = 'block';
  }

  public showUserInformation(): void {
    document.getElementById('users-table').style.display = 'none';
    document.getElementById('user-infor').style.display = 'block';
  }
  public applyFilter(even: Event): void {
    let searchTerm = (even.target as HTMLInputElement).value.toLowerCase();
    this.filterUsers = this.users.filter(u =>
      u.email.toLowerCase().includes(searchTerm) ||
      u.username.toLowerCase().includes(searchTerm) ||
      u.firstName.toLowerCase().includes(searchTerm) ||
      u.lastName.toLowerCase().includes(searchTerm) ||
      u.role.toLowerCase().includes(searchTerm) ||
      u.userId.toLowerCase().includes(searchTerm)
    )
  }

  public onProfileImageChange(events: any) {
    let listUploaded = events.target.files;
    if (listUploaded.length > 0) {
      if (this.isImageFile(listUploaded[0])) {
        this.fileName = listUploaded[0].name;
        this.profileImage = listUploaded[0];
        this.toast.success('Upload file successfully!');
        return;
      }
    }
    this.fileName = null;
    this.profileImage = null;
    this.toast.error('Not image file');
  }
  public get isManager(): boolean {
    return this.user.role != "ROLE_USER";
  }
  public onUpdateUser(): void {

  }
  private isImageFile(file: File): boolean {
    // Define an array of allowed image MIME types
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    return allowedImageTypes.includes(file.type);
  }
}

