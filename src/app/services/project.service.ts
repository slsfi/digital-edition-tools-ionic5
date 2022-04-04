import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  // Auth header is added by interceptor
  getProjects(): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/projects/');
  }

  createProject(projectName: string): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/projects/');
  }
}
