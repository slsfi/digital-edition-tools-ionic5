import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FileQueueObject, FileUploadService } from '../../../services/file-upload.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-facsimile-upload',
  templateUrl: './facsimile-upload.component.html',
  styleUrls: ['./facsimile-upload.component.scss'],
})
export class FacsimileUploadComponent implements OnInit {

  public response:string;

  public imageNumber: string;
  public collectionId: string;
  public imageStartNumber: number;



  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploadService) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.uploader.setProjectName(projectName);
    this.uploader.setFacsimileCollectionId('9088');
    // Start numbering on 1
    this.imageStartNumber = 1;
    this.uploader.setImageStartNumber(this.imageStartNumber);
  }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  orderBy() {
    this.queue.subscribe( fileQueue => {
      fileQueue.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      });
    });
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }

  updateOrderNumber( itemOrderNumber: number, direction: number ) {
    this.queue.subscribe( fileQueueObject => {
      if( (itemOrderNumber + direction) >= 0 && (itemOrderNumber + direction) < fileQueueObject.length )
        this.arrayMove(fileQueueObject, itemOrderNumber, (itemOrderNumber + direction));
    } );
  }

  arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  setImageOrderNumber( e ) {
    this.imageStartNumber = Number(e.detail.value);
    this.uploader.setImageStartNumber(this.imageStartNumber);
  }

  setCollectionId( nr: string ) {
    this.collectionId = nr;
  }

}
