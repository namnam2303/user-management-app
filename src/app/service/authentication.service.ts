import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   host : string = environment.apiUrl;
  private token : string;
  private loggedInUsername : string;
  private jwtHelper : JwtHelperService = new JwtHelperService();
  constructor(private httpClient : HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }
  public register(user : User) : Observable<User> {
    return this.httpClient.post<User>(`${this.host}/user/register`, user);
  }

  public logOut() : void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token : string ) : void {
    this.token = token;
    localStorage.setItem('token', this.token);
  } 

  public addUserToLocalCache(user : User) : void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    let userJson = localStorage.getItem('user');
    return  JSON.parse(userJson);
  }

  public loadToken() : void {
    let tokenJson = localStorage.getItem('token');
    if(tokenJson != null) {
      this.token = tokenJson;
    }
  }

  public getToken() : string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    console.log(this.token);
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    this.logOut();
    return false;
  }
}
