import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private api_url_path: string;

  constructor(private http: HttpClient) {
    this.api_url_path = environment.api_url_path;
    this.testAccessToken().subscribe(
      async (res) => {

      },
      async (res) => {

      }
    );
  }

  testAccessToken() : Observable<any>  {
    // Autorization header (with access token) is applied automatically by TokenInterceptor
    return this.http.post<any>(environment.api_url + "/auth/test", null);
  }

  getProjects(): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(environment.api_url + '/' + this.api_url_path + '/projects/');
  }
}
