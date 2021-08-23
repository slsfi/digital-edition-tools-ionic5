import { Component, OnInit } from '@angular/core';
import { TocService } from '../../../services/toc.service';
import * as uuid from 'uuid';
import { CollectionService } from '../../../services/collection.service';
import { Publication } from 'src/app/models/publication';
import { TocItem } from 'src/app/models/toc';
@Component({
  selector: 'app-toc-editor',
  templateUrl: './toc-editor.component.html',
  styleUrls: ['./toc-editor.component.scss'],
})
export class TocEditorComponent implements OnInit {

  public tocData: Array<TocItem> = [];
  public publicationData: Array<Publication> = [];
  public selectedCollectionId: Number;
  public collections: Array<any>;

  constructor(private tocService: TocService, private collectionService: CollectionService) {
    this.selectedCollectionId = null;
    this.getCollections();
    this.getTOC();
    this.getCollectionPublications();
  }

  ngOnInit() {
  }

  public updateSelectedCollection(){
    this.getTOC();
    this.getCollectionPublications();
  }

  async getCollections() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.getCollections(projectName).subscribe(
      async (res) => {
        this.collections = res;
      }
    );
  }

  async getTOC() {
    this.tocData = [];
    const projectName = localStorage.getItem('selectedProjectName');
    if( this.selectedCollectionId !== null ) {
      this.tocService.getCollectionTOC(projectName, this.selectedCollectionId).subscribe(
        async (res) => {
          this.tocData.push(res);
        },
        async (error) => {
          // The TOC could not be found, we need to create an initial placeholder
          let collectionName = 'placeholder';
          this.collections.forEach(collection => {
            if ( collection['id'] === this.selectedCollectionId ) {
              collectionName = collection['name'];
            }
          });
          const tmpTOC: TocItem =
          {
            "text":collectionName,
            "collectionId": String(this.selectedCollectionId),
            "type": "title"
          };
          this.tocData.push(tmpTOC);
        }
      );
    }
  }

  async getCollectionPublications() {
    this.publicationData = [];
    const projectName = localStorage.getItem('selectedProjectName');
    if( this.selectedCollectionId !== null ) {
      this.collectionService.getCollectionPublications(projectName, this.selectedCollectionId).subscribe(
        async (res) => {
          this.publicationData = res;
        }
      );
    }
  }
}
