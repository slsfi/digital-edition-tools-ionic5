import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { CollectionService } from 'src/app/services/collection.service';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-version-grid',
  templateUrl: './version-grid.component.html',
  styleUrls: ['./version-grid.component.scss'],
})
export class VersionGridComponent implements OnInit {

  public versions: Array<any>;
  public collections: Array<any>;
  @ViewChild("version_table") version_table: ElementRef;
  public versionTable: Handsontable;

  @Input() publicationId: Number;

  public selectedCollectionId: Number;

  public versionColumns = [
    { data: 'id', readOnly: true },
    { data: 'name', readOnly: false },
    { data: 'published', readOnly: false },
    { data: 'original_filename', readOnly: false },
    { data: 'date_created', readOnly: true },
    { data: 'date_modified', readOnly: true }
  ];

  constructor( private versionService: VersionService, private collectionService: CollectionService ) {
    this.versions = [];
  }

  ngOnInit() {
    if ( this.publicationId ) {
      this.getVersions();
    }
  }

  ngAfterViewInit() {
    this.createVersionTable();
  };

  ngOnChanges() {
    if ( this.publicationId ) {
      this.getVersions();
    }
  }

  public updateSelectedCollection(){
    if ( this.publicationId ) {
      this.getVersions();
    }
  }

  async getVersions() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.versionService.getVersions(projectName, this.publicationId).subscribe(
      async (res) => {
        this.versions = res;
        this.versionTable.loadData(this.versions);
      }
    );
  }

  public addNewVersion() {
    if ( this.selectedCollectionId !== null && this.selectedCollectionId !== undefined ) {
      /* const newVersion = {};
      newVersion.name = 'placeholder';
      newVersion.published = 1;
      newVersion.version_collection_id = this.selectedCollectionId;
      this.versions.push(newVersion);
      this.versionTable.loadData(this.versions);
      this.createVersion(newVersion);*/
    }
  }

  createVersionTable () {
    const version_table = this.version_table.nativeElement;
    const __parent = this;
    this.versionTable = new Handsontable(version_table, {
      data: [],
      columns: this.versionColumns,
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
          const rowData = __parent.versionTable.getDataAtRow(Number(changedData[0]));
          const versionData = {};
          // Add labels to indexes
          __parent.versionColumns.forEach((value, index) => {
            versionData[value['data']] = rowData[index];
            versionData['title'] = versionData['name'];
            versionData['filename'] = versionData['original_filename'];
          });
          console.log(versionData);
          // __parent.editVersion(versionData);
        });
      }
    });
    this.getVersions();
  }

  async getCollections() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.getCollections(projectName).subscribe(
      async (res) => {
        this.collections = res;
      }
    );
  }

  async setVersions() {
    if( this.versions !== undefined ) {
      this.versionTable.loadData(this.versions);
    }
  }

  async createVersion( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.versionService.createVersion(projectName, data).subscribe(
      async (res) => {
        this.getVersions();
      }
    );
  }

  async editVersion( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.versionService.editVersion(projectName, data).subscribe(
      async (res) => {
        this.getVersions();
      }
    );
  }
}
