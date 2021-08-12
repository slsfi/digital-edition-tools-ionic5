import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { CollectionService } from 'src/app/services/collection.service';
import { ManuscriptService } from 'src/app/services/manuscript.service';

@Component({
  selector: 'app-manuscript-grid',
  templateUrl: './manuscript-grid.component.html',
  styleUrls: ['./manuscript-grid.component.scss'],
})
export class ManuscriptGridComponent implements OnInit {

  public manuscripts: Array<any>;
  public collections: Array<any>;
  @ViewChild("manuscript_table") manuscript_table: ElementRef;
  public manuscriptTable: Handsontable;

  @Input() publicationId: Number;

  public selectedCollectionId: Number;

  public manuscriptColumns = [
    { data: 'id', readOnly: true },
    { data: 'name', readOnly: false },
    { data: 'published', readOnly: false },
    { data: 'original_filename', readOnly: false },
    { data: 'date_created', readOnly: true },
    { data: 'date_modified', readOnly: true }
  ];

  constructor( private manuscriptService: ManuscriptService, private collectionService: CollectionService ) {
    this.manuscripts = [];
  }

  ngOnInit() {
    if ( this.publicationId ) {
      this.getManuscripts();
    }
  }

  ngAfterViewInit() {
    this.createManuscriptTable();
  };

  ngOnChanges() {
    if ( this.publicationId ) {
      this.getManuscripts();
    }
  }

  public updateSelectedCollection(){
    if ( this.publicationId ) {
      this.getManuscripts();
    }
  }

  async getManuscripts() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.manuscriptService.getManuscripts(projectName, this.publicationId).subscribe(
      async (res) => {
        this.manuscripts = res;
        this.manuscriptTable.loadData(this.manuscripts);
      }
    );
  }

  public addNewManuscript() {
    if ( this.selectedCollectionId !== null && this.selectedCollectionId !== undefined ) {
      /* const newManuscript = {};
      newManuscript.name = 'placeholder';
      newManuscript.published = 1;
      newManuscript.manuscript_collection_id = this.selectedCollectionId;
      this.manuscripts.push(newManuscript);
      this.manuscriptTable.loadData(this.manuscripts);
      this.createManuscript(newManuscript);*/
    }
  }

  createManuscriptTable () {
    const manuscript_table = this.manuscript_table.nativeElement;
    const __parent = this;
    this.manuscriptTable = new Handsontable(manuscript_table, {
      data: [],
      columns: this.manuscriptColumns,
      colHeaders: ['Id', 'Name', 'Published?', 'XML File', 'Date Created', 'Date Modified'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      stretchH: 'all',
      nestedRows: false,
      width: '100%',
      startRows: 5,
      height: '23vh',
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
          const rowData = __parent.manuscriptTable.getDataAtRow(Number(changedData[0]));
          const manuscriptData = {};
          // Add labels to indexes
          __parent.manuscriptColumns.forEach((value, index) => {
            manuscriptData[value['data']] = rowData[index];
            manuscriptData['title'] = manuscriptData['name'];
            manuscriptData['filename'] = manuscriptData['original_filename'];
          });
          console.log(manuscriptData);
          // __parent.editManuscript(manuscriptData);
        });
      }
    });
    this.getManuscripts();
  }

  async getCollections() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.getCollections(projectName).subscribe(
      async (res) => {
        this.collections = res;
      }
    );
  }

  async setManuscripts() {
    if( this.manuscripts !== undefined ) {
      this.manuscriptTable.loadData(this.manuscripts);
    }
  }

  async createManuscript( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.manuscriptService.createManuscript(projectName, data).subscribe(
      async (res) => {
        this.getManuscripts();
      }
    );
  }

  async editManuscript( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.manuscriptService.editManuscript(projectName, data).subscribe(
      async (res) => {
        this.getManuscripts();
      }
    );
  }
}
