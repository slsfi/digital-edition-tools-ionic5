import { Component, OnInit } from '@angular/core';
import { GitService } from 'src/app/services/git.service';

@Component({
  selector: 'app-git-grid',
  templateUrl: './git-grid.component.html',
  styleUrls: ['./git-grid.component.scss'],
})
export class GitGridComponent implements OnInit {

  public gitTreeStructure: Array<Object> = [];
  public gitTreeStructureFullStructure: Object = {};
  public currentPath: string = '';
  public dataLoading: boolean = true;

  constructor( public gitService: GitService ) {
  }

  ngOnInit() {
    this.getFileTree();
  }

  /*
    Get the file tree from the server or parse the tree to the selected "folder" level
    Optional refresh if files need to be loaded again
  */
  async getFileTree( refresh: boolean = false ) {
    const projectName = localStorage.getItem('selectedProjectName');
    this.dataLoading = true;

    if ( this.currentPath !== '' && refresh === false ) {
      this.parseStructure( this.gitTreeStructureFullStructure );
      this.dataLoading = false;
    } else {
      this.gitService.getFileTree(projectName, this.currentPath).subscribe(
        async (res: Object) => {
          this.gitTreeStructureFullStructure = res;
          this.parseStructure( res );
          this.dataLoading = false;
        },
        async (res) => {

        }
      );
    }
  }

  private parseStructure ( structure: Object ) {
    const topStructure = [];
    const folderPath = this.currentPath.split('/');
    // get the files or folder in the inner most part of the array
    if ( folderPath.length > 1 ) {
      folderPath.forEach( folder => {
        if ( folder !== '' ) {
          structure = structure[folder];
        }
      });
    }
    // Add the keys as values to the array of files and folders
    Object.keys(structure).forEach(function(key, index) {
      // Check if file
      if ( structure[key] === null ) {
        topStructure.push({'name': key, 'file': true});
      } else {
        topStructure.push({'name': key, 'file': false});
      }
    });
    this.gitTreeStructure = topStructure;
  }

  public selectItem(item: Object) {
    if ( item['file'] === true ) {
      // Open the file

    } else {
      this.currentPath += item['name'] + '/'
      this.getFileTree();
    }
  }

  public goBack() {
    if ( this.currentPath !== '' ) {
      const folderPath = this.currentPath.split('/');
      // get the previous folder
      if ( folderPath.length > 1 ) {
        let newPath: string = '';
        for( let i = 0; i < (folderPath.length - 2); i++ ) {
          if ( folderPath[i] !== '' && folderPath[i] !== undefined ) {
            newPath += folderPath[i] + '/'
          }
        }
        this.currentPath = newPath;
      }
      this.getFileTree( false );
    }
  }

  public refresh() {
    this.getFileTree( true );
  }
}
