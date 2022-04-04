import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ManuscriptService {
  private apiUrlPath: string;

  constructor( private http: HttpClient ) {
    this.apiUrlPath = environment.api_url_path;
  }

  getManuscripts( projectName: string, publicationId: Number ) {
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/publication/' + publicationId + '/manuscripts/');
  }

  createManuscript( projectName: string, data: any ) {
    return this.http.post<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/publication/' +
    data['publication_id'] + '/manuscripts/new/', data);
  }

  editManuscript( projectName: string, data: any ) {
    return this.http.post<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/manuscripts/' + data['id'] + '/edit/', data);
  }
}
