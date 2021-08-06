import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TocService {
  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  getCollectionTOC( projectName: String, collectionId: Number ): Observable<any> {
    // Send the request to the server
    return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/toc/' + collectionId);
  }

  saveCollectionToc( projectName: String, collectionId: Number, data: any ) {
    return this.http.put<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/toc/' + collectionId, data);
  }

}
