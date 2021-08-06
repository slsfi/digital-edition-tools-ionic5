import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrlPath: string;

  constructor( private http: HttpClient ) {
    this.apiUrlPath = environment.api_url_path;
  }

  getPublications( projectName: string, collectionId: Number ) {
    return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/collection/' + collectionId + '/publications');
  }

  createPublication( projectName: string, data: any ) {
    return this.http.post<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/publication_collection/' +
    data['publication_collection_id'] + '/publications/new/', data);
  }

  editPublication( projectName: string, data: any ) {
    return this.http.post<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/publication/' + data['id'] + '/edit/', data);
  }
}
