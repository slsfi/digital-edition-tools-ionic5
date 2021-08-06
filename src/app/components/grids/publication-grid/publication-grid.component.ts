import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { CollectionService } from 'src/app/services/collection.service';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-publication-grid',
  templateUrl: './publication-grid.component.html',
  styleUrls: ['./publication-grid.component.scss'],
})
export class PublicationGridComponent implements OnInit {

  public publications: Array<any>;
  public collections: Array<any>;
  @ViewChild("publication_table") publication_table: ElementRef;
  public publicationTable: Handsontable;

  public selectedCollectionId: Number;

  public publicationColumns = [
    { data: 'id', readOnly: true },
    { data: 'name', readOnly: false },
    { data: 'published', readOnly: false },
    { data: 'original_filename', readOnly: false },
    { data: 'date_created', readOnly: true },
    { data: 'date_modified', readOnly: true }
  ];

  constructor( private publicationService: PublicationService, private collectionService: CollectionService ) {
    this.publications = [];
  }

  ngOnInit() {
    this.getCollections();
  }

  ngAfterViewInit() {
    this.createPublicationTable();
  };

  public updateSelectedCollection(){
    this.getPublications();
  }

  async getPublications() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.publicationService.getPublications(projectName, this.selectedCollectionId).subscribe(
      async (res) => {
        this.publications = res;
        this.publicationTable.loadData(this.publications);
      }
    );
  }

  public addNewPublication() {
    if ( this.selectedCollectionId !== null && this.selectedCollectionId !== undefined ) {
      const newPublication: Publication = new Publication();
      newPublication.name = 'placeholder';
      newPublication.published = 1;
      newPublication.publication_collection_id = this.selectedCollectionId;
      this.publications.push(newPublication);
      this.publicationTable.loadData(this.publications);
      this.createPublication(newPublication);
    }
  }

  createPublicationTable () {
    const publication_table = this.publication_table.nativeElement;
    const __parent = this;
    this.publicationTable = new Handsontable(publication_table, {
      data: [],
      columns: this.publicationColumns,
      colHeaders: ['Id', 'Name', 'Published?', 'XML File', 'Date Created', 'Date Modified'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      stretchH: 'all',
      nestedRows: false,
      width: '100%',
      startRows: 5,
      height: '80vh',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: false,
      rowHeaderWidth: 80,
      colWidths: [30, 100, 30, 100, 50, 50],
      hiddenColumns: {
        columns: [],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: function (change, source) {
        if (source === 'loadData') {
          return; //don't save this change
        }
        change.forEach( changedData => {
          const rowData = __parent.publicationTable.getDataAtRow(Number(changedData[0]));
          const publicationData = {};
          // Add labels to indexes
          __parent.publicationColumns.forEach((value, index) => {
            publicationData[value['data']] = rowData[index];
            publicationData['title'] = publicationData['name'];
            publicationData['filename'] = publicationData['original_filename'];
          });
          console.log(publicationData);
          __parent.editPublication(publicationData);
        });
      }
    });
    this.getPublications();
  }

  async getCollections() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.getCollections(projectName).subscribe(
      async (res) => {
        this.collections = res;
      }
    );
  }

  async setPublications() {
    if( this.publications !== undefined ) {
      this.publicationTable.loadData(this.publications);
    }
  }

  async createPublication( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.publicationService.createPublication(projectName, data).subscribe(
      async (res) => {
        this.getPublications();
      }
    );
  }

  async editPublication( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.publicationService.editPublication(projectName, data).subscribe(
      async (res) => {
        this.getPublications();
      }
    );
  }
}
