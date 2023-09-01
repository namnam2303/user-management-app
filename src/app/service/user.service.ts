import { Injectable } from '@angular/core';
import  {environment} from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomHttpRespone } from '../model/customHttpResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  public getUsers() : Observable<User[]> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });

    return this.httpClient.get<User[]>(`${this.host}/user/list`, {headers});
  }

  public addUser(formData : FormData) : Observable<User> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });
    return this.httpClient.post<User>(`${this.host}/user/add`, formData, {headers});
  }

  public updateUser(formData : FormData) : Observable<User> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });
    return this.httpClient.post<User>(`${this.host}/user/update`, formData, {headers});
  }

  public resetPassword(email : string) : Observable<CustomHttpRespone> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });
    return this.httpClient.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`, {headers});
  }

  public updateProfileImage(formData : FormData) : Observable<HttpEvent<User>> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });
    return this.httpClient.post<User>(`${this.host}/user/updateProfileImage`, formData,
    {
      observe: 'events', // i want to know when the request is processed (upload the image successfully),
      headers : headers
    });
  }
  public deleteUser(userName : string) : Observable<CustomHttpRespone> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + jwt
    });
    return this.httpClient.delete<CustomHttpRespone>(`${this.host}/user/delete/${userName}`, {headers});
  }

  public addUserToLocalCache(users : User[]) : void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache() : User[] {
    if(localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public getUserForm(loggedInUsername : string, user : User, profileImage : File) : FormData {
    const formData = new FormData(); 
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName); 
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
