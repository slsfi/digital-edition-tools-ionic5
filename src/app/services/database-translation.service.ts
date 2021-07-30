import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DatabaseTranslationService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  createNewTranslation(projectName: string, translation: object): Observable<any> {
    // Send the request to the server
    return this.http.post<any>(
      environment.api_url + '/' + this.apiUrlPath  + '/' + projectName + '/translation/new/',
      translation
    );
  }

  editTranslation (projectName: string, translation: object): Observable<any> {
    // Send the request to the server
    return this.http.post<any>(
      environment.api_url + '/' + this.apiUrlPath  + '/' + projectName + '/translations/' + translation['id'] +  '/edit/',
      translation
    );
  }

}
