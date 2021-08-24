import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Handsontable from 'handsontable';
import { FacsimileService } from '../../../services/facsimile.service';

@Component({
  selector: 'app-facsimile-collection-grid',
  templateUrl: './facsimile-collection-grid.component.html',
  styleUrls: ['./facsimile-collection-grid.component.scss'],
})
export class FacsimileCollectionGridComponent implements OnInit {

  public facsimileCollections: Array<any>;

  @ViewChild('facsimileCollection_table') facsimileCollection_table: ElementRef;
  public facsimileCollectionTable: Handsontable;


  public facsimileCollectionTableColumns = [
    {data: 'id'},
    {data: 'description'},
    {data: 'external_url'},
    {data: 'folder_path'},
    {data: 'number_of_pages'},
    {data: 'page_comment'},
    {data: 'start_page_number'},
    {data: 'title'},
    {data: 'date_created'},
    {data: 'date_modified'},
    {data: 'deleted'}
  ];

  constructor( private facsimileService: FacsimileService ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.createFacsimileCollectionTable();
  };

  /*
    Get the file tree from the server or parse the tree to the selected 'folder' level
    Optional refresh if files need to be loaded again
  */
  async getFacsimileCollections( refresh: boolean = false ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.facsimileService.getFacsimileCollections(projectName).subscribe(
      async (res) => {
        this.facsimileCollections = res;
        this.facsimileCollectionTable.loadData(this.facsimileCollections);
      },
      async (res) => {

      }
    );
  }

  createFacsimileCollectionTable () {
    const facsimileCollectionTable = this.facsimileCollection_table.nativeElement;
    const __parent = this;
    this.facsimileCollectionTable = new Handsontable(facsimileCollectionTable, {
      data: [],
      columns: this.facsimileCollectionTableColumns,
      colHeaders: ['Id', 'description', 'external_url', 'folder_path', 'number_of_pages', 'page_comment', 'start_page_number', 'title', 'Text', 'Text', 'Text'],
      columnSorting: false,
      rowHeaders: true,
      contextMenu: true,
      stretchH: 'all',
      nestedRows: true,
      width: '100%',
      height: '55vh',
      filters: false,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: false,
      manualRowMove: true,
      manualColumnResize: true,
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

        });
      },
      afterCreateRow: function (index, amount, source?) {

      },
      afterAddChild: function (parent, element, index?) {
      }
    });
    this.getFacsimileCollections();
  }
}
