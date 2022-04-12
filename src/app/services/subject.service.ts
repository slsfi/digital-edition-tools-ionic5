import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  // Auth header is added by interceptor
  getSubjects(projectName?: string): Observable<any> {
    // Send the request to the server
    if( projectName !== null && projectName !== undefined ) {
      return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/subjects');
    } else {
      return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/subjects');
    }
  }

  createSubject(projectName: string, subject: object): Observable<any> {
    // Send the request to the server
    return this.http.post<any>(
      localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath  + '/' + projectName + '/subjects/new/',
      subject
    );
  }

  editSubject(projectName: string, subject: object): Observable<any> {
    // Send the request to the server
    return this.http.post<any>(
      localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath  + '/' + projectName + '/subjects/' + subject['id'] + '/edit/',
      subject
    );
  }
}
