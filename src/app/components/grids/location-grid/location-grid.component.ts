import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-grid',
  templateUrl: './location-grid.component.html',
  styleUrls: ['./location-grid.component.scss'],
})
export class LocationGridComponent implements OnInit {

  public locations: [];

  /**
   *
   * "alias": null,
    "city": null,
    "country": null,
    "date_created": "Mon, 06 Apr 2020 06:46:13 GMT",
    "date_modified": null,
    "deleted": 0,
    "description": null,
    "id": 15077,
    "latitude": null,
    "legacy_id": "pl15077",
    "longitude": null,
    "name": "Dregsby",
    "name_translation_id": 8951,
    "project_id": 10,
    "region": null,
    "source": null
   *
   */
  public locationColumns = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
      { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Alias', field: 'alias', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Country', field: 'country', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Region', field: 'region', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Source', field: 'source', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Latitude', field: 'latitude', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Longitude', field: 'longitude', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Date Created', field: 'date_created', sortable: true, filter: true  },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Deleted (0, 1)', field: 'deleted', sortable: true, filter: true  }
  ];

  constructor(private locationService: LocationService) {
    this.getLocations();
  }

  ngOnInit() {
  }

  async getLocations() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.locationService.getLocations(projectName).subscribe(
      async (res) => {
        this.locations = res;
      },
      async (res) => {

      }
    );
  }

  nameEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
  }

  publishedEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
  }

}
