import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { XmlParserService } from 'src/app/services/xml-parser.service';
import {HelperFunctionsService} from 'src/app/services/helper-functions.service'
import Handsontable from 'handsontable';

@Component({
  selector: 'app-xml-entity-selector-grid',
  templateUrl: './xml-entity-selector-grid.component.html',
  styleUrls: ['./xml-entity-selector-grid.component.scss'],
})
export class XmlEntitySelectorGridComponent implements OnInit {

  @Input() public selectedFileFullPath: string;

  public availableSubjects: Array<any>;
  public availableLocations: Array<any>;
  public availableWorks: Array<any>;

  private domParser = new DOMParser();
  public xmlOccurrences: Array<any> = [];
  public selectedXmlOccurrences: Array<any> = [];
  public selectedOccurrenceType:string = 'subjects';
  // Might be good to move this to the environment configuration file?
  public availableOccurrenceTypes: Array<string> = ['subjects', 'locations', 'works'];
  public dataLoading: boolean = false;
  public xmlDocument: XMLDocument;

  public occurrenceTable: Handsontable;

  private suggestions: Array<object>;


  public occurrenceColumns = [
    { data: 'occurence', readOnly: true },
    { data: 'id' },
    { data: 'matches', type: 'dropdown'},
    { data: 'section', readOnly: true },
    { data: 'saved', readOnly: true },
    { data: 'referenceId', readOnly: true }
  ];


  constructor(  private xmlParserService: XmlParserService,
                private subjectService: SubjectService,
                private helpFunctions: HelperFunctionsService) {
    this.getSubjects();
  }

  ngOnInit() {
    this.createOccurrenceTable();
  }

  ngOnChanges() {
    // empty the data
    this.selectedXmlOccurrences = [];
    this.xmlOccurrences = [];
    // get the occurrences
    if ( this.selectedFileFullPath !== undefined && this.selectedFileFullPath !== null ) {
      this.dataLoading = true;
      this.getFileData();
    }
  }

  // the the file data and parse the occurrences
  public getFileData() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.xmlParserService.getFile(projectName, this.selectedFileFullPath).subscribe(
      async (res: string) => {
        if ( res['file'] !== undefined && String(res['file']).length > 0 ) {
          const xmlDocumentString = this.xmlParserService.b64DecodeUnicode(res['file']);
          this.xmlDocument = this.domParser.parseFromString(xmlDocumentString, 'text/xml');
          // Parse the xml string into a xml dom object
          this.parseXML();
          this.dataLoading = false;
        }
      },
      async (res) => {

      }
    );
  }

  async getSubjects() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.subjectService.getSubjects(projectName).subscribe(
      async (res) => {
        this.availableSubjects = res;
      },
      async (res) => {

      }
    );
  }

  private parseXML() {
    this.xmlOccurrences = this.xmlParserService.getXMLOccurrences(this.xmlDocument, this.availableOccurrenceTypes);
    this.xmlOccurrences[this.selectedOccurrenceType].forEach(element => {
      // element['matches'] = this.matchOccurrence(element['occurence']);
    });
    this.selectedXmlOccurrences = this.xmlOccurrences[this.selectedOccurrenceType];
    this.dataLoading = false;
    this.occurrenceTable.loadData(this.selectedXmlOccurrences);
  }

  public selectOccurrenceType () {
    this.selectedXmlOccurrences = [];
    this.selectedXmlOccurrences = this.xmlOccurrences[this.selectedOccurrenceType];
  }

  // Try to get a match for the occurrence from the database lists of subjects, locations etc.
  private matchOccurrence( occurrence: string ): Array<object> {
    const possibleMatches = [];
    if( this.selectedOccurrenceType === 'subjects' ) {
      this.availableSubjects.forEach(subject => {
        if ( subject['full_name'] !== null && subject['full_name'] !== ''
              && this.helpFunctions.fuzzysearch(occurrence, subject['full_name']) === true ) {
          possibleMatches.push({name: subject['full_name'], id: subject['id']});
        }
      });
    }
    return possibleMatches;
  }

  // Write the new ID to the XML file and push it to the server, update the file again to reflect the changes
  public idEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
    this.dataLoading = true;
    this.xmlDocument = this.xmlParserService.editXMLOccurrences(this.xmlDocument, this.selectedOccurrenceType, data.data.referenceId, data.newValue);
    this.parseXML();
    // Push the changes to the API...
  }

  createOccurrenceTable () {
    const occurrence_table = document.getElementById('occurrence_table');
    const __parent = this;
    this.occurrenceTable = new Handsontable(occurrence_table, {
      data: [],
      columns: this.occurrenceColumns,
      colHeaders: ['Name', 'Databse Id', 'Suggestion', 'XML Context', 'Saved to Database', 'referenceId'],
      columnSorting: true,
      rowHeaders: true,
      nestedRows: false,
      width: 'auto',
      height: '100%',
      filters: true,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: true,
      hiddenColumns: {
        columns: [],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation',
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

              });
            }
          },
          add_child: {
            name: '<b>Add translation</b>', // Name can contain HTML
            callback(key, selection, clickEvent) { // Callback for specific option
              selection.forEach(select => {

              });
            }
          }
        }
      },
      afterChange: function (change, source) {
        if (source === 'loadData') {
          return; //don't save this change
        }
        change.forEach( changedData => {
        });
      },
      afterCreateRow: function (index, amount, source?) {
        // Create a placeholder row in the DB and update the data
        if( source !== undefined ) {

        }
      },
      afterAddChild: function (parent, element, index?) {
        // Add a translation row
        if ( parent !== null ) {

        } else {
          // Add new translation
        }
      }
    });
  }
}
