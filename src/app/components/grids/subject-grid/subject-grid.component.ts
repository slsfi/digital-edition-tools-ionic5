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
      { headerName: 'First name', field: 'first_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Last name', field: 'last_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Full name', field: 'full_name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Date Created', field: 'date_created', sortable: true, filter: true  },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Deleted (0, 1)', field: 'deleted', sortable: true, filter: true  }
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

  nameEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
  }

  publishedEdited(data: any) {
    console.log(data)
    console.log(data.data.id + ' = ' + data.colDef.field + ' = ' + data.newValue)
  }
}
