import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of} from 'rxjs';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import { environment } from '../../environments/environment.prod';
const { Storage } = Plugins;

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  private refreshTokenTimeout;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
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
      switchMap((tokens: {access_token, refresh_token }) => {
        this.currentAccessToken = tokens.access_token;
        const storeAccess = Storage.set({key: ACCESS_TOKEN_KEY, value: tokens.access_token});
        const storeRefresh = Storage.set({key: REFRESH_TOKEN_KEY, value: tokens.refresh_token});
        // this.startRefreshTokenTimer();
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  logout() {
    this.currentAccessToken = null;
    this.stopRefreshTokenTimer();
    // Remove all stored tokens
    const deleteAccess = Storage.remove({ key: ACCESS_TOKEN_KEY });
    const deleteRefresh = Storage.remove({ key: REFRESH_TOKEN_KEY });
    from(Promise.all([deleteAccess, deleteRefresh]));
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login')
  }

  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refreshToken = from(Storage.get({ key: REFRESH_TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.value}`
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
    return from(Storage.set({ key: ACCESS_TOKEN_KEY, value: accessToken }));
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
