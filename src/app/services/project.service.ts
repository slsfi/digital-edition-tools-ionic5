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
  }

  // Auth header is added by interceptor
  getProjects(): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(environment.api_url + '/' + this.api_url_path + '/projects/');
  }
}
