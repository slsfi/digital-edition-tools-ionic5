import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  // Auth header is added by interceptor
  getFileTree( projectName: string, folder?: string ): Observable<any> {
    if ( folder === undefined || folder === null ) {
      return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/get_tree/documents');
    } else {
      folder = folder.slice(0, folder.lastIndexOf('/'));
      return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/get_tree/documents' + folder );
    }
  }
}
