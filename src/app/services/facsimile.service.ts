import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FacsimileService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  // Auth header is added by interceptor
  getFacsimileCollections( projectName: string ): Observable<any> {
      return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/facsimile_collection/list/');
  }
}