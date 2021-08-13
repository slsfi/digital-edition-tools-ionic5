import { Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { LocationService } from 'src/app/services/location.service';
import { DatabaseTranslationService } from 'src/app/services/database-translation.service';
import { element } from 'protractor';
import * as languages from '../../../models/iso639';

@Component({
  selector: 'app-location-grid',
  templateUrl: './location-grid.component.html',
  styleUrls: ['./location-grid.component.scss'],
})
export class LocationGridComponent implements OnInit {

  public locations: any[];
  public translations: any[];
  public locationTable: Handsontable;
  public translationTable: Handsontable;
  public selectedLanguage: string = 'sv';

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
    { data: 'database_id', readOnly: true },
    { data: 'database_name', readOnly: true },
    { data: 'language', type: 'dropdown', source: Object.keys(languages.iso639Languages) },
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

  public translationColumns = [
    { data: 'id', readOnly: true },
    { data: 'translation_id', readOnly: true },
    { data: 'is_translation', readOnly: true},
    { data: 'database_id', readOnly: true },
    { data: 'database_name', readOnly: true },
    { data: 'language'},
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


  public iso639Languages;

  constructor(
    private locationService: LocationService,
    private databaseTranslationService: DatabaseTranslationService) {
    this.iso639Languages = languages.iso639Languages;
  }

  ngOnInit() {
    this.createLocationTable();
    this.createTranslationTable();
  }

  async getLocations() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.locationService.getLocations(projectName).subscribe(
      async (res) => {
        const data = [];
        const translationData = [];
        res.forEach(element => {
          element['language'] = '';
          element['database_name'] = element['name'];
          element['is_translation'] = false;
          element['database_id'] = element['id'];
          // We need to extract the translations from the returned result
          // The data may contain translations for multiple data fields, so filtering is needed
          // We also need to group by language to display the data on the same row
          if ( element['translations'] !== null ) {
            element['__children'] = [];
            let groupedTranslations = [];
            element['translations'].forEach( (translation, index) => {
              if ( groupedTranslations[translation['language']] !== undefined ) {
                groupedTranslations[translation['language']][translation['field_name']] = translation['text'];
                groupedTranslations[translation['language']]['translation_id'] = translation['translation_id'];
                groupedTranslations[translation['language']]['id'] = translation['id'];
                groupedTranslations[translation['language']]['is_translation'] = true;
                groupedTranslations[translation['language']]['database_name'] = element['name'];
                groupedTranslations[translation['language']]['date_created'] = translation['date_created'];
                groupedTranslations[translation['language']]['date_modified'] = translation['date_modified'];
              } else {
                groupedTranslations[translation['language']] = {};
                groupedTranslations[translation['language']][translation['field_name']] = translation['text'];
                groupedTranslations[translation['language']]['translation_id'] = translation['translation_id'];
                groupedTranslations[translation['language']]['id'] = translation['id'];
                groupedTranslations[translation['language']]['is_translation'] = true;
                groupedTranslations[translation['language']]['database_name'] = element['name'];
                groupedTranslations[translation['language']]['date_created'] = translation['date_created'];
                groupedTranslations[translation['language']]['date_modified'] = translation['date_modified'];
              }
            });

            for ( let language in groupedTranslations ) {
              let tmpTranslation = groupedTranslations[language];
              element['__children'].push(tmpTranslation);
              if ( language === this.selectedLanguage ) {
                translationData.push(tmpTranslation);
              }
            }
          }

          data.push(element);
        });
        this.locations = data;
        this.locationTable.loadData(data);
        console.log(translationData);
        this.translationTable.loadData(translationData);
      }
    );
  }

  createLocationTable () {
    const location_table = document.getElementById('location_table');
    const __parent = this;
    this.locationTable = new Handsontable(location_table, {
      data: [],
      columns: this.locationColumns,
      colHeaders: ['id', 'translation_id', 'is_translation', 'Database Id', 'Identifier', 'Language', 'Name', 'Alias', 'City', 'Country', 'Region',
      'source', 'latitude', 'longitude', 'description', 'date_created', 'date_modified', 'deleted'],
      columnSorting: true,
      rowHeaders: true,
      nestedRows: false,
      width: 'auto',
      height: '100%',
      filters: true,
      contextMenu: {
        callback(key, selection, clickEvent) {
          // Common callback for all options
          console.log(key, selection, clickEvent);
        },
        items: {
          row_above: {
            disabled() { // `disabled` can be a boolean or a function
              // Disable option when first row was clicked
              return this.getSelectedLast()[0] === 0; // `this` === hot
            }
          },
          row_below: {
            name: 'Click to add row below' // Set custom text for predefined option
          },
          show_translations: {
            name: '<b>Show translations for language</b>', // Name can contain HTML
            callback(key, selection, clickEvent) { // Callback for specific option
              selection.forEach(select => {
                const selectedRowId = select['end']['row'];
                const rowData = __parent.locationTable.getDataAtRow(Number(selectedRowId));
                // Add labels to indexes
                __parent.locationColumns.forEach((value, index) => {
                  rowData[value['data']] = rowData[index];
                });
                if( rowData['language'] === '' ){
                  __parent.selectedLanguage = 'not set';
                } else {
                  __parent.selectedLanguage = rowData['language'];
                }
              });
            }
          },
          add_child: {
            name: '<b>Add translation</b>', // Name can contain HTML
            callback(key, selection, clickEvent) { // Callback for specific option
              selection.forEach(select => {
                const selectedRowId = select['end']['row'];
                const rowData = __parent.locationTable.getDataAtRow(Number(selectedRowId));
                // Add labels to indexes
                __parent.locationColumns.forEach((value, index) => {
                  rowData[value['data']] = rowData[index];
                });
                const translation: object = {
                  translation_id: rowData['translation_id'],
                  table_name: 'location',
                  parent_id: rowData['id'],
                  text: 'not set',
                  field_name: 'language'
                };
                __parent.createNewTranslation(translation);
              });
              __parent.selectedLanguage = 'not set';
            }
          }
        }
      },
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
        console.log('afterChange');
        change.forEach( changedData => {
          const rowData = __parent.locationTable.getDataAtRow(Number(changedData[0]));
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
                __parent.editTranslation(locationData);
              });
            } else {
              // existing row, that is the main row
              __parent.editlocation(locationData);
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
          __parent.createLocation();
        }
      },
      afterAddChild: function (parent, element, index?) {
        // Add a translation row
        if ( parent !== null ) {
          console.log('afterAddChild');
          const translation: object = {
            translation_id: parent['translation_id'],
            table_name: 'location',
            parent_id: parent['id'],
            text: 'not set',
            field_name: 'language'
          };
          console.log(translation);
          __parent.createNewTranslation(translation);
        } else {
          // Add new translation
        }
      }
    });
    this.getLocations();
  }

  createTranslationTable () {
    const translation_table = document.getElementById('translation_table');
    const __parent = this;
    this.translationTable = new Handsontable(translation_table, {
      data: [],
      columns: this.translationColumns,
      colHeaders: ['id', 'translation_id', 'is_translation', 'Database Id', 'Identifier', 'Language', 'Name', 'Alias', 'City', 'Country', 'Region',
      'source', 'latitude', 'longitude', 'description', 'date_created', 'date_modified', 'deleted'],
      columnSorting: true,
      rowHeaders: true,
      contextMenu: true,
      nestedRows: false,
      width: 'auto',
      height: 'auto',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: true,
      hiddenColumns: {
        columns: [0, 1, 2, 3],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: function (change, source) {
        if (source === 'loadData') {
          return; //don't save this change
        }
        change.forEach( changedData => {
          const rowData = __parent.translationTable.getDataAtRow(Number(changedData[0]));
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
                locationData['translation_text_id'] = dbId;
                locationData['field_name'] = ch[1];
                locationData['table_name'] = 'location';
                locationData['text'] = ch[3];
                __parent.editTranslation(locationData);
              });
            } else {
              // existing row, that is the main row
              __parent.editlocation(locationData);
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
          __parent.createLocation();
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
            parent_id: parent['id'],
            text: 'not set',
            field_name: 'language'
          };
          console.log(translation);
          __parent.createNewTranslation(translation);
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

  toggleNestedRows() {
    if ( this.locationTable.getSettings().nestedRows === true ) {
      this.locationTable.updateSettings({nestedRows: false})
    } else {
      this.locationTable.updateSettings({nestedRows: true})
    }
    this.getLocations();
  }

  public updateSelectedLanguage() {

  }

}
