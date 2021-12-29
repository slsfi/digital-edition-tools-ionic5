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
    if ( this.publicationId !== null && this.publicationId !== undefined ) {
      const newManuscript: {name: string, published: Number, publication_id: Number} = {
        name: 'placeholder',
        published: 1,
        publication_id: this.publicationId
      };

      this.manuscripts.push(newManuscript);
      this.manuscriptTable.loadData(this.manuscripts);
      this.createManuscript(newManuscript);
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
      nestedRows: false,
      stretchH: 'all',
      width: 'auto',
      height: 'auto',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: false,
      colWidths: [50, 280, 150, 480, 150, 150],
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
          __parent.editManuscript(manuscriptData);
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
