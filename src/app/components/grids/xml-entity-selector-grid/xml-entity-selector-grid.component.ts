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

  public occColumns = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
    { headerName: 'Occurence', field: 'occurence', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
    {
      headerName: 'Language',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.extractValues(this.availableOccurrenceTypes)
      }
    },
    { headerName: 'Matches', field: 'matches', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
    { headerName: 'Section', field: 'section', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
    { headerName: 'Saved', field: 'saved', sortable: true, filter: true  },
    { headerName: 'Reference ID', field: 'referenceId', sortable: true, filter: true }
  ];

  public nameEdited() {

  }

  public extractValues(mappings) {
    return Object.keys(mappings);
  }

  public defaultColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: true,
    resizable: true,
  };

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
    //this.createOccurrenceTable();
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
    // this.occurrenceTable.loadData(this.selectedXmlOccurrences);
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
}
