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
      { headerName: 'ID', field: 'id', sortable: true, filter: true  },
      { headerName: 'Name', field: 'name', sortable: true, filter: true  },
      { headerName: 'Date Created', field: 'date_created', sortable: true, filter: true  },
      { headerName: 'Date Modified', field: 'date_modified', sortable: true, filter: true  },
      { headerName: 'Published', field: 'published', sortable: true, filter: true  },
      { headerName: 'Deleted', field: 'deleted', sortable: true, filter: true  }
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

}
