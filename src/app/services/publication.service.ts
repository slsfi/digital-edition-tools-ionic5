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

  // https://api.sls.fi/digitaledition/{projectName}/collection/{collectionId}/publications
  getCollectionPublications( projectName: string, collectionId: Number ) : Observable<any> {
    // Send the request to the server
    return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/collection/' + collectionId + '/publications');
  }
}
