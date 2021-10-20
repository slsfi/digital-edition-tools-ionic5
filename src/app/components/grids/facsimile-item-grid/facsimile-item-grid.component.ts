import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FacsimileService } from '../../../services/facsimile.service';

@Component({
  selector: 'app-facsimile-item-grid',
  templateUrl: './facsimile-item-grid.component.html',
  styleUrls: ['./facsimile-item-grid.component.scss'],
})
export class FacsimileItemGridComponent implements OnInit {

  @Input() public facsimileItems: any;
  @Output() onSelected = new EventEmitter();
  private selectedProjectName: string;
  public rowSelection: string;

  public facsimilePublicationsColumns = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true, onCellValueChanged: this.updateFacsimileItem.bind(this)},
    { headerName: 'Pages', field: 'page', sortable: true, filter: true, editable: false, valueGetter: this.getPages, onCellValueChanged: this.updateFacsimileItem.bind(this)},
    { headerName: 'Collection Start Page', field: 'start_page_number', sortable: true, filter: true, editable: false, onCellValueChanged: this.updateFacsimileItem.bind(this)},
    { headerName: 'Publication Start Page', field: 'page_nr', sortable: true, filter: true, editable: false, onCellValueChanged: this.updateFacsimileItem.bind(this)},
    { headerName: 'Last Page', field: 'last_page', sortable: true, filter: true, editable: false, onCellValueChanged: this.updateFacsimileItem.bind(this)},
    { headerName: 'Total Collection Pages', field: 'number_of_pages', sortable: true, filter: true, editable: true, onCellValueChanged: this.updateFacsimileItem.bind(this) },
    { headerName: 'External URL', field: 'external_url', sortable: true, filter: true, editable: true, onCellValueChanged: this.updateFacsimileItem.bind(this) },
    { headerName: 'Type', field: 'type', sortable: true, filter: true, editable: true, onCellValueChanged: this.updateFacsimileItem.bind(this) }
  ];

  public defaultColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: false,
    resizable: false,
  };

  constructor( public facsimileService: FacsimileService ) {
    this.selectedProjectName = localStorage.getItem('selectedProjectName');
    this.rowSelection = 'single';
  }

  ngOnInit() {

  }

  getPages( params ){
    return (params.data.last_page - params.data.first_page) + 1
  }

  updateFacsimileItem( params ) {
    params.data.id = params.data.publication_facsimile_id;
    this.facsimileService.updateFacsimilePublication(this.selectedProjectName, params.data).subscribe( (ret) => {
      console.log(ret);
    } );

    this.facsimileService.updateFacsimilePublicationCollection(this.selectedProjectName, params.data).subscribe( (ret) => {
      console.log(ret);
    } );
  }

  selectFacsimileItem( data: any ) {
    const item = data.api.getSelectedRows()[0];
    this.onSelected.emit(item);
  }

}
