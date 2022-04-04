import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  // Auth header is added by interceptor
  getWorks(projectName?: string): Observable<any> {
    // Send the request to the server
    if( projectName !== null && projectName !== undefined ) {
      return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/works');
    } else {
      return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/works');
    }
  }

  createWork(subjectName: string): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/works');
  }
}
