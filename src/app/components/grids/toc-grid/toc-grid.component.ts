import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TocItem } from 'src/app/models/toc';
import { Publication } from 'src/app/models/publication';
import Handsontable from 'handsontable';
import { TocService } from 'src/app/services/toc.service';

@Component({
  selector: 'app-toc-grid',
  templateUrl: './toc-grid.component.html',
  styleUrls: ['./toc-grid.component.scss'],
})

export class TocGridComponent implements OnInit {

  @ViewChild("toc_table") toc_table: ElementRef;
  @ViewChild("pub_table") pub_table: ElementRef;
  @Input() publicationData: Publication[];
  @Input() tocData: TocItem[];

  public tocTable: Handsontable;
  public pubTable: Handsontable;
  private tocIds: any = [];

  public tocColumns = [
    { data: 'text', readOnly: false },
    { data: 'collectionId', readOnly: false },
    { data: 'itemId', readOnly: false },
    { data: 'type', readOnly: false, type: 'dropdown', source: ['title', 'subtitle','est', 'section_title'] },
    { data: 'date', readOnly: false },
    { data: 'url', readOnly: false },
    { data: 'collapsed', readOnly: false, type: 'dropdown', source: ['', 'yes','no']}
  ];

  public pubColumns = [
    { data: 'name', readOnly: true },
    { data: 'itemId', readOnly: true },
    { data: 'id', readOnly: true },
    { data: 'alreadyInTOC', readOnly: true }
  ];

  constructor( private tocService: TocService ) {

  }

  ngOnInit() {

  };

  ngOnChanges() {
    this.setTocData();
    this.setPublications();
  }

  ngAfterViewInit() {
    this.createTOCTable();
    this.createPublicationTable();
  };

  getTocIds( items?: any[] ) {
    items.forEach( (item) => {
      if( item.itemId !== undefined ) {
        this.tocIds.push(String(item.itemId).replace(/_ch[0-9]+/, ''));
      }
      if ( item.children !== undefined && item.children !== null && item.children.length > 0 ) {
        this.getTocIds(item.children);
      }
    });
  }

  filterPublications() {
    // console.log(this.tocIds);
    const publications = [];
    this.publicationData.forEach( publication => {
      const itemId = publication.publication_collection_id + '_' + publication.id;
      if( !this.tocIds.includes(itemId) ) {
        publication['alreadyInTOC'] = false;
      } else {
        publication['alreadyInTOC'] = true;
      }
      publication['itemId'] = itemId;
      publications.push(publication);

    });

    this.publicationData = publications;
  }

  createTOCTable () {
    const toc_table = this.toc_table.nativeElement;
    const __parent = this;
    this.tocTable = new Handsontable(this.toc_table.nativeElement, {
      data: [{}],
      columns: this.tocColumns,
      colHeaders: ['Text', 'Collection Id', 'Item Id', 'Type', 'Date', 'Url', 'Collapsed?'],
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
      rowHeaderWidth: 80,
      colWidths: [100, 50, 50, 50, 50, 50, 50],
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
          const updatedData = __parent.transformBack(__parent.tocTable.getSourceData());
          __parent.saveCollectionData(updatedData);
        });
      },
      afterCreateRow: function (index, amount, source?) {

      },
      // Used to enable pasting in nested rows
      beforePaste: (data, coords) => {
        let selected = this.tocTable.getSelected();
        // Only apply this copy/paste for the first column, default for rest
        if ( selected[0][1] === 0 ) {
          let selectedRow:number = this.tocTable.getSelected()[0][0];
          this.tocTable.alter('insert_row', selectedRow, data.length)
          this.tocTable.populateFromArray(selectedRow, 0, data);
          return false;
        }
      }
    });
    this.setTocData();
  }

  async saveCollectionData( data: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    if ( data[0]['collectionId'] ) {
      this.tocService.saveCollectionToc(projectName, data[0]['collectionId'], data[0]).subscribe(
        async (res) => {
          this.tocData.push(res);
        }
      );
    }
  }

  addRows

  createPublicationTable () {
    const pub_table = this.pub_table.nativeElement;
    const __parent = this;
    this.pubTable = new Handsontable(this.pub_table.nativeElement, {
      data: [],
      columns: this.pubColumns,
      colHeaders: ['Name', 'Item Id', 'Publication Id', 'In TOC?'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      stretchH: 'all',
      nestedRows: false,
      width: '100%',
      height: '20vh',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: false,
      rowHeaderWidth: 80,
      colWidths: [100, 50, 50, 50],
      hiddenColumns: {
        columns: [],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation'
    });
    this.setPublications();
  }

  async setTocData() {
    if ( this.tocData !== undefined && this.tocTable !== undefined ) {
      try {
        this.tocTable.loadData(this.transform(this.tocData));
        this.tocTable.refreshDimensions();
      } catch ( e ) {
        console.log(e);
      }
    }
  }

  async setPublications() {
    if ( this.tocData !== undefined && this.publicationData !== undefined && this.pubTable !== undefined ) {
      try {
        this.getTocIds(this.tocData);
        this.filterPublications();
        this.pubTable.loadData(this.publicationData);
        this.pubTable.refreshDimensions();
      } catch ( e ) {
        console.log(e);
      }
    }
  }

  /** Only works if we don't have any properties named 'children' */
  public transform(node) {
    const s = JSON.stringify(node);
    const t = s.replace(/"children"/g, '"__children"');
    return JSON.parse(t);
  }

  public transformBack(node) {
    const s = JSON.stringify(node);
    const t = s.replace(/"__children"/g, '"children"');
    return JSON.parse(t);
  }
}
