import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-facsimile-upload',
  templateUrl: './facsimile-upload.component.html',
  styleUrls: ['./facsimile-upload.component.scss'],
})
export class FacsimileUploadComponent implements OnInit {

  public uploader:FileUploader;
  public hasBaseDropZoneOver:boolean = true;
  public response:string;

  private URL = '';

  constructor() {
    this.uploader = new FileUploader({
      url: this.URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit() {}

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
}
