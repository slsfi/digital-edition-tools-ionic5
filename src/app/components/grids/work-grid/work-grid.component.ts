import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-work-grid',
  templateUrl: './work-grid.component.html',
  styleUrls: ['./work-grid.component.scss'],
})
export class WorkGridComponent implements OnInit {

  public works: [];
  public filter: '';

  publicworkColumns = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
      { headerName: 'name', field: 'name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
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
  };

  constructor(private workService: WorkService) {
    this.getWorks();
  }

  ngOnInit() {
  }

  async getWorks() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.workService.getWorks(projectName).subscribe(
      async (res) => {
        this.works = res;
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
