import { Component, Input, OnInit } from '@angular/core';
import { XmlParserService } from 'src/app/services/xml-parser.service';

@Component({
  selector: 'app-xml-entity-selector-grid',
  templateUrl: './xml-entity-selector-grid.component.html',
  styleUrls: ['./xml-entity-selector-grid.component.scss'],
})
export class XmlEntitySelectorGridComponent implements OnInit {

  @Input() public selectedFileFullPath: string;
  private domParser = new DOMParser();
  public xmlOccurrences: Array<any> = [];
  public selectedXmlOccurrences: Array<any> = [];
  public selectedOccurrenceType:string = 'subjects';
  // Might be good to move this to the environment configuration file?
  public availableOccurrenceTypes: Array<string> = ['subjects', 'locations', 'works'];
  public dataLoading: boolean = false;
  public xmlDocument: XMLDocument;


  public occurrenceColumns = [
    { headerName: 'Name', field: 'occurence', sortable: true, filter: true, editable: false },
    { headerName: 'Databse Id', field: 'id', sortable: true, filter: true, editable: true, onCellValueChanged: this.idEdited.bind(this) },
    { headerName: 'XML Context', field: 'section', sortable: true, filter: true, editable: false },
    { headerName: 'Saved to Database', field: 'saved', sortable: true, filter: true, editable: false },
    { headerName: 'referenceId', field: 'referenceId', sortable: true, filter: true, editable: false }
  ];

  constructor( private xmlParserService: XmlParserService ) { }

  ngOnInit() {

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
          this.parseXML(this.xmlDocument);
          this.dataLoading = false;
        }
      },
      async (res) => {

      }
    );
  }

  private parseXML( xmlDocumentString: XMLDocument ) {
    this.xmlOccurrences = this.xmlParserService.getXMLOccurrences(this.xmlDocument, this.availableOccurrenceTypes);
    this.selectedXmlOccurrences = this.xmlOccurrences[this.selectedOccurrenceType];
    this.dataLoading = false;
  }

  public selectOccurrenceType () {
    this.selectedXmlOccurrences = [];
    this.selectedXmlOccurrences = this.xmlOccurrences[this.selectedOccurrenceType];
  }

  // Write the new ID to the XML file and push it to the server, update the file again to reflect the changes
  public idEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
    this.dataLoading = true;
    this.xmlDocument = this.xmlParserService.editXMLOccurrences(this.xmlDocument, this.selectedOccurrenceType, data.data.referenceId, data.newValue);
    this.parseXML(this.xmlDocument);
    // Push the changes to the API...
  }
}
