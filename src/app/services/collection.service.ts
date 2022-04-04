import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrlPath: string;

  constructor( private http: HttpClient ) {
    this.apiUrlPath = environment.api_url_path;
  }

  // https://api.sls.fi/digitaledition/{projectName}/collection/{collectionId}/publications
  getCollectionPublications( projectName: string, collectionId: Number ) : Observable<any> {
    // Send the request to the server
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/collection/' + collectionId + '/publications');
  }

  getCollections( projectName: string ) {
    return this.http.get<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/publication_collection/list/');
  }

  createCollection( projectName: string, data: any ) {
    return this.http.post<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/publication_collection/new/', data);
  }

  editCollection( projectName: string, data: any ) {
    return this.http.post<any>(localStorage.getItem('SELECTED_ENVIRONMENT') + '/' + this.apiUrlPath + '/' + projectName + '/publication_collection/' + data['id'] + '/edit/', data);
  }
}
