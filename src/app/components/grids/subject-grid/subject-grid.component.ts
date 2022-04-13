import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-grid',
  templateUrl: './subject-grid.component.html',
  styleUrls: ['./subject-grid.component.scss'],
})
export class SubjectGridComponent implements OnInit {

  public subjects: [];
  public filter: '';

  public subjectColumns = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
      { headerName: 'Legacy Id', field: 'legacy_id', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this)  },
      { headerName: 'First name', field: 'first_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Last name', field: 'last_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Preposition', field: 'preposition', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Full name', field: 'full_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Date Born', field: 'date_born', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Date Deceased', field: 'date_deceased', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Description', field: 'description', sortable: true, filter: true, editable: true, onCellValueChanged: this.editValue.bind(this) },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Deleted (0, 1)', field: 'deleted', sortable: true, filter: true, editable: false }
  ];

  public defaultColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: true,
    resizable: true,
  };

  constructor(private subjectService: SubjectService) {
    this.getSubjects();
  }

  ngOnInit() {
  }

  async getSubjects() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.subjectService.getSubjects(projectName).subscribe(
      async (res) => {
        this.subjects = res;
      },
      async (res) => {

      }
    );
  }

  editValue ( data: any ) {
    const fieldName = data.colDef.field;
    const subject: object = {[fieldName]: data.newValue, 'id': data.data.id};
    const projectName = localStorage.getItem('selectedProjectName');
    this.subjectService.editSubject(projectName, subject).subscribe(
      async (res) => {
        this.getSubjects();
      }
    );
  }

  addRow( event: any ) {
    const projectName = localStorage.getItem('selectedProjectName');
    const subject: object = {'first_name': 'placeholder'};
    this.subjectService.createSubject(projectName, subject).subscribe(
      async (res) => {
        this.getSubjects();
      }
    );
  }
}
