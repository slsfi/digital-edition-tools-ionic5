import { Component, OnInit } from '@angular/core';
import { TocService } from '../../../services/toc.service';
import * as uuid from 'uuid';
import { PublicationService } from '../../../services/publication.service';
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

  constructor(private tocService: TocService, private publicationService: PublicationService) {
    // this.getTOC();
    this.getCollectionPublications();
  }

  ngOnInit() {

  }

  async getTOC() {
    this.tocService.getCollectionTOC('topelius', 201).subscribe(
      async (res) => {
        this.tocData.push(res);
        this.setMissingData(this.tocData);
      },
      async (res) => {

      }
    );
  }

  async getCollectionPublications() {
    this.publicationService.getCollectionPublications('topelius', 201).subscribe(
      async (res) => {
        this.publicationData = res;
        this.setMissingData(this.publicationData);
      },
      async (res) => {

      }
    );
  }

  // Old TOC files might be missing UIDs and Children
  private setMissingData( items?: any[] ) : void {
    items.forEach( (item) => {
      if ( item.unique_id === undefined || item.unique_id === '') {
        item.unique_id = uuid.v4();
      }
      if ( item.children !== undefined && item.children.length > 0 ) {
        this.setMissingData(item.children);
      } else if ( item.children === undefined ) {
        item.children = [];
      }
    });
  }

}
