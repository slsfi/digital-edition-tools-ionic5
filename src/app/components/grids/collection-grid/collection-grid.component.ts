import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
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
    { data: 'collection_intro_filename', readOnly: false },
    { data: 'collection_intro_published', readOnly: true },
    { data: 'publication_collection_introduction_id', readOnly: false },
    { data: 'collection_title_filename', readOnly: false },
    { data: 'collection_title_published', readOnly: true },
    { data: 'publication_collection_title_id', readOnly: false },
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
    this.collectionTable =  new Handsontable(collection_table, {
      data: [],
      columns: __parent.collectionColumns,
      colHeaders: ['Id', 'Name', 'Published?', 'Intro file', 'Intro published', 'introduction_id',
       'Title file', 'Title published', 'title_id', 'Date Created', 'Date Modified'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      width: 'auto',
      height: 'auto',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      stretchH: 'all',
      colWidths: [50, 280, 150, 380, 150, 150, 380, 150, 150, 150, 150],
      manualColumnResize: true,
      manualColumnMove: true,
      licenseKey: 'non-commercial-and-evaluation',
      hiddenColumns: {
        columns: [5,8],
        indicators: true
      },
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
