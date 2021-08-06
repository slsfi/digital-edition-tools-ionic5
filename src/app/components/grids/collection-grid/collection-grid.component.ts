import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { CollectionService } from 'src/app/services/collection.service';
import { Collection } from '../../../models/collection';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  styleUrls: ['./collection-grid.component.scss'],
})
export class CollectionGridComponent implements OnInit {

  public collections: Array<any>;
  @ViewChild("collection_table") collection_table: ElementRef;
  public collectionTable: Handsontable;

  public collectionColumns = [
    { data: 'id', readOnly: true },
    { data: 'name', readOnly: false },
    { data: 'published', readOnly: false },
    { data: 'date_created', readOnly: true },
    { data: 'date_modified', readOnly: true }
  ];

  constructor( private collectionService: CollectionService ) {
    this.collections = [];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createCollectionTable();
  };

  async getCollections() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.getCollections(projectName).subscribe(
      async (res) => {
        this.collections = res;
        this.collections.forEach(element => {
          element['name'] = element['title'];
        });
        this.collectionTable.loadData(this.collections);
      }
    );
  }

  public addNewCollection() {
    const newCollection: Collection = new Collection();
    newCollection.name = 'placeholder';
    newCollection.published = 1;
    this.collections.push(newCollection);
    this.collectionTable.loadData(this.collections);
    this.createCollection(newCollection);
  }

  createCollectionTable () {
    const collection_table = this.collection_table.nativeElement;
    const __parent = this;
    this.collectionTable = new Handsontable(collection_table, {
      data: [],
      columns: this.collectionColumns,
      colHeaders: ['Id', 'Name', 'Published?', 'Date Created', 'Date Modified'],
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
      colWidths: [100, 50, 50],
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
          const rowData = __parent.collectionTable.getDataAtRow(Number(changedData[0]));
          const collectionData = {};
          // Add labels to indexes
          __parent.collectionColumns.forEach((value, index) => {
            collectionData[value['data']] = rowData[index];
          });
          console.log(collectionData);
          __parent.editCollection(collectionData);
        });
      }
    });
    this.getCollections();
  }

  async setCollections() {
    if( this.collections !== undefined ) {
      this.collectionTable.loadData(this.collections);
    }
  }

  async createCollection( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.createCollection(projectName, data).subscribe(
      async (res) => {
        this.getCollections();
      }
    );
  }

  async editCollection( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.collectionService.editCollection(projectName, data).subscribe(
      async (res) => {
        this.getCollections();
      }
    );
  }
}
