import { Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { LocationService } from 'src/app/services/location.service';
import { DatabaseTranslationService } from 'src/app/services/database-translation.service';
import { element } from 'protractor';

@Component({
  selector: 'app-location-grid',
  templateUrl: './location-grid.component.html',
  styleUrls: ['./location-grid.component.scss'],
})
export class LocationGridComponent implements OnInit {

  public locations: any[];
  public dataTable: Handsontable;

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
  /* public locationColumns = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
      { headerName: 'Name', field: 'name', },
      { headerName: 'Alias', field: 'alias', },
      { headerName: 'City', field: 'city', },
      { headerName: 'Country', field: 'country', },
      { headerName: 'Region', field: 'region', },
      { headerName: 'Source', field: 'source', },
      { headerName: 'Latitude', field: 'latitude', },
      { headerName: 'Longitude', field: 'longitude', },
      { headerName: 'Description', field: 'description', },
      { headerName: 'Date Created', field: 'date_created', sortable: true, filter: true  },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Deleted (0, 1)', field: 'deleted', sortable: true, filter: true  }
  ]; */

  public locationColumns = [
    { data: 'id', readOnly: true },
    { data: 'translation_id', readOnly: true },
    { data: 'is_translation', readOnly: true},
    { data: 'database_name', readOnly: true },
    { data: 'language' },
    { data: 'name' },
    { data: 'alias' },
    { data: 'city' },
    { data: 'country' },
    { data: 'region' },
    { data: 'source' },
    { data: 'latitude' },
    { data: 'longitude' },
    { data: 'description' },
    { data: 'date_created', readOnly: true },
    { data: 'date_modified', readOnly: true },
    { data: 'deleted' }
  ];

  constructor(private locationService: LocationService, private databaseTranslationService: DatabaseTranslationService) {

  }

  ngOnInit() {
    this.createDataTable();
  }

  async getLocations() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.locationService.getLocations(projectName).subscribe(
      async (res) => {
        const data = [];
        res.forEach(element => {
          element['language'] = 'default';
          element['database_name'] = element['name'];
          element['is_translation'] = false;
          // We need to extract the translations from the returned result
          // The data may contain translations for multiple data fields, so filtering is needed
          // TODO - We also need to group by language to display the data on the same row
          // TODO - If we're grouping on language we also need to collect the correct translation_text ids to be able to update the correct rows
          if ( element['translations'] !== null ) {
              element['__children'] = [];
              element['translations'].forEach( translation => {
                const tmpTranslation = {
                  translation_id: translation['translation_id'],
                  language: translation['language'],
                  name: '', id: translation['id'],
                  database_name: element['name'],
                  is_translation: true
                };
                tmpTranslation[translation['field_name']] = translation['text'];

                element['__children'].push(tmpTranslation);
              });
          }
          data.push(element);
        });
        this.locations = data;
        this.dataTable.loadData(data);
      }
    );
  }

  createDataTable () {
    const location_table = document.getElementById('location_table');
    const __parent = this;
    this.dataTable = new Handsontable(location_table, {
      data: [],
      columns: this.locationColumns,
      colHeaders: ['id', 'translation_id', 'is_translation', 'Identifier', 'Language', 'Name', 'Alias', 'City', 'Country', 'Region',
      'source', 'latitude', 'longitude', 'description', 'date_created', 'date_modified', 'deleted'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      nestedRows: true,
      width: '99%',
      height: '85vh',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: true,
      hiddenColumns: {
        columns: [0, 1, 2],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: function (change, source) {
        if (source === 'loadData') {
          return; //don't save this change
        }
        change.forEach( changedData => {
          const rowData = __parent.dataTable.getDataAtRow(Number(changedData[0]));
          const locationData = {};
          // Add labels to indexes
          __parent.locationColumns.forEach((value, index) => {
            locationData[value['data']] = rowData[index];
          });
          const dbId = locationData['id'];
          const dbTranslationId = locationData['translation_id'];
          const isTranslation = locationData['is_translation'];
          // New row
          if ( dbId === null ) {

          } else {
            // existing row, that is a translation (sub row)
            if ( isTranslation === true ) {
              // If we add a save button we might get multiple changes at once
              change.forEach(ch => {
                locationData['field_name'] = ch[1];
                locationData['table_name'] = 'location';
                locationData['text'] = ch[3];
                // __parent.editTranslation(locationData);
              });
            } else {
              // existing row, that is the main row
              // __parent.editlocation(locationData);
            }
          }
          // New translation
          if ( dbTranslationId === null ) {

          } else {
            // existing translation
          }
          console.log(dbId);
          console.log(dbTranslationId);
          console.log(isTranslation);
        });
      },
      afterCreateRow: function (index, amount, source?) {
        // Create a placeholder row in the DB and update the data
        if( source !== undefined ) {
          console.log('afterCreateRow:');
          console.log(index);
          console.log(amount);
          console.log(source);
          // __parent.createLocation();
        }
      },
      afterAddChild: function (parent, element, index?) {
        // Add a translation row
        if ( parent !== null ) {
          console.log('afterAddChild');
          console.log(parent);
          const translation: object = {
            translation_id: parent['translation_id'],
            table_name: 'location',
            parent_id: parent['id'], text: parent['name'],
            field_name: null
          };
          console.log(translation);
          // __parent.createNewTranslation(translation);
        } else {
          // Add new translation
        }


      }
    });
    this.getLocations();
  }

  async createLocation() {
    const projectName = localStorage.getItem('selectedProjectName');
    const location: object = {name: 'placeholder'};
      this.locationService.createLocation(projectName, location).subscribe(
        async (res) => {
          this.getLocations();
        }
    );
  }

  async createNewTranslation ( translation: object ) {
    const projectName = localStorage.getItem('selectedProjectName');
      this.databaseTranslationService.createNewTranslation(projectName, translation).subscribe(
        async (res) => {
          this.getLocations();
        }
    );
  }

  async editlocation ( location: object ) {
    const projectName = localStorage.getItem('selectedProjectName');
      this.locationService.editLocation(projectName, location).subscribe(
        async (res) => {
          this.getLocations();
        }
    );
  }

  async editTranslation ( translation: object ) {
    const projectName = localStorage.getItem('selectedProjectName');
      this.databaseTranslationService.editTranslation(projectName, translation).subscribe(
        async (res) => {
          this.getLocations();
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
