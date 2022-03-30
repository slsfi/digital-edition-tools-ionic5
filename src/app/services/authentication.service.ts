import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of} from 'rxjs';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment.prod';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';
const USER_PROJECTS = 'user-projects';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  private refreshTokenTimeout;

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    this.loadToken();
  }

  async loadToken() {
    await this.storage.create();
    const token = await this.storage.get(ACCESS_TOKEN_KEY);
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
      // this.startRefreshTokenTimer();
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email, password}): Observable<any> {
    return this.http.post( environment.api_url + '/auth/login', credentials).pipe(
      switchMap((tokens: {access_token, refresh_token, user_projects}) => {
        this.currentAccessToken = tokens.access_token;
        const storeAccess = this.storage.set(ACCESS_TOKEN_KEY, tokens.access_token);
        const storeRefresh = this.storage.set(REFRESH_TOKEN_KEY,tokens.refresh_token);
        const userProjects = this.storage.set(USER_PROJECTS, tokens.user_projects);
        // this.startRefreshTokenTimer();
        return from(Promise.all([storeAccess, storeRefresh, userProjects]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  async logout() {
    this.currentAccessToken = null;
    this.stopRefreshTokenTimer();
    // Remove all stored tokens
    await this.storage.clear();
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login')
  }

  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refreshToken = from(this.storage.get(REFRESH_TOKEN_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token['value']) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token['value']}`
            })
          }
          // this.startRefreshTokenTimer();
          return this.http.post(environment.api_url + '/auth/refresh', null, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(this.storage.set(ACCESS_TOKEN_KEY, accessToken));
  }

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const token = String(from(Storage.get({ key: REFRESH_TOKEN_KEY })));
    // const refreshToken = JSON.parse(atob(token.split('.')[1]));
    // set a timeout to refresh the token a minute before it expires
    // const expires = new Date(refreshToken['exp'] * 1000);
    const timeout = 8000;
    this.refreshTokenTimeout = setTimeout(() => this.getNewAccessToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  public getToken(): string {
    return this.currentAccessToken;
  }
}
