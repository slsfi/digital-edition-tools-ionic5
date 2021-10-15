import { FacsimileService } from './../../../services/facsimile.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileQueueObject, FileUploadService } from '../../../services/file-upload.service';
@Component({
  selector: 'app-facsimile-upload',
  templateUrl: './facsimile-upload.component.html',
  styleUrls: ['./facsimile-upload.component.scss'],
})
export class FacsimileUploadComponent implements OnInit {

  public response:string;

  public imageNumber: string;
  public collectionId: number;
  public projectName: string;
  public facsimileCollections: any;

  @Output() onCompleteItem = new EventEmitter();
  @Output() onUploaded = new EventEmitter();

  @Input() public selectedFacsimileCollectionId: string;
  @Input() public imageStartNumber: number;

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploadService, public facsimileService: FacsimileService) {
    this.projectName = localStorage.getItem('selectedProjectName');
  }

  ngOnInit() {
    this.uploader.setProjectName(this.projectName);
    this.uploader.setImageStartNumber(this.imageStartNumber);
    this.uploader.setFacsimileCollectionId(this.selectedFacsimileCollectionId);
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  ngOnChanges() {
    this.uploader.setProjectName(this.projectName);
    this.uploader.setImageStartNumber(this.imageStartNumber);
    this.uploader.setFacsimileCollectionId(this.selectedFacsimileCollectionId);
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
    this.onUploaded.emit();
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
    this.setOrderNumbers();
  }

  updateOrderNumber( item: FileQueueObject, itemOrderNumber: number, direction: number ) {
    this.queue.subscribe( (fileQueueObject: FileQueueObject[]) => {
      if( (itemOrderNumber + direction) >= 0 && (itemOrderNumber + direction) < fileQueueObject.length )
        this.arrayMove(fileQueueObject, itemOrderNumber, (itemOrderNumber + direction));
        let start = this.imageStartNumber;
        fileQueueObject.forEach(item => {
          item.setOrderNumber(start);
          start++;
        });
    } );
  }

  setOrderNumbers() {
    this.queue.subscribe( (fileQueueObject: FileQueueObject[]) => {
      let start = this.imageStartNumber;
      fileQueueObject.forEach(item => {
        item.setOrderNumber(start);
        start++;
      });
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
}
