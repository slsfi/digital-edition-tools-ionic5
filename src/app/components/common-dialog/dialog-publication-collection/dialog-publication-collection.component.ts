import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicationCollectionDescriptor } from '../../../services/data.service';

@Component({
  selector: 'app-dialog-publication-collection',
  templateUrl: './dialog-publication-collection.component.html',
  styleUrls: ['./dialog-publication-collection.component.css']
})
export class DialogPublicationCollectionComponent implements OnInit {

  //header: string = 'Select Publication Collection';
  publicationCollectionEmpty: PublicationCollectionDescriptor = {} as any;
  publicationCollection: PublicationCollectionDescriptor;

  constructor( public dialogRef: MatDialogRef<DialogPublicationCollectionComponent>, @Inject(MAT_DIALOG_DATA) public header: string ) {
  }

  ngOnInit() {
  }

  onPublicationCollectionOpened(event: any) {
    this.publicationCollection = event;
  }

  onOKClick() {
    // Return the edited project data
    this.dialogRef.close(this.publicationCollection);
  }

  onCancelClick() {
    // Cancelled, return empty project data
    this.dialogRef.close(this.publicationCollectionEmpty);
  }

  onKeyUp(event: KeyboardEvent) {
    if(event.keyCode == 13) {// Enter
      // Return the edited project data
      this.dialogRef.close(this.publicationCollection);
    }
    else if(event.keyCode == 27) {// Escape
      // Cancelled, return empty project data
      this.dialogRef.close(this.publicationCollectionEmpty);
    }
  }

}
