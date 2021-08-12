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
    return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/publication/' + publicationId + '/manuscripts/');
  }

  createManuscript( projectName: string, data: any ) {
    return this.http.post<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/publication_collection/' +
    data['publication_collection_id'] + '/publications/new/', data);
  }

  editManuscript( projectName: string, data: any ) {
    return this.http.post<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/publication/' + data['id'] + '/edit/', data);
  }
}
