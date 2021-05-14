import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
})
export class ProjectGridComponent implements OnInit {

  public projects: [];

  public projectColumns = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true  },
      { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true, onCellValueChanged: this.nameEdited },
      { headerName: 'Date Created', field: 'date_created', sortable: true, filter: true  },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Published (0, 1, 2)', field: 'published', sortable: true, filter: true, editable: true, onCellValueChanged: this.publishedEdited },
      { headerName: 'Deleted (0, 1)', field: 'deleted', sortable: true, filter: true  }
  ];

  constructor(private projectService: ProjectService) {
    this.getProjects();
  }

  ngOnInit() {
  }

  async getProjects() {
    this.projectService.getProjects().subscribe(
      async (res) => {
        this.projects = res;
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