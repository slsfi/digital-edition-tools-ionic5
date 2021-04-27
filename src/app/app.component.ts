import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { ProjectService } from './services/project.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from "@ionic/angular";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Publisher', url: '/tool-selector/Publisher-Tool', icon: 'mail', isOpen: false, subPages: [
      {title: 'Project Editor', url: 'Project-Editor', icon: 'bulb'}]
    },
    { title: 'Table of Contents Editor', url: '/tool-selector/TOC-Editor', icon: 'list', isOpen: false },
    { title: 'Facsimile Tool', url: '/tool-selector/Facsimile-Tool', icon: 'images', isOpen: false },
    { title: 'Entity Editor', url: '/tool-selector/Entity-Editor', icon: 'file-tray', isOpen: false },
    { title: 'Event Editor', url: '/tool-selector/Event-Editor', icon: 'git-compare', isOpen: false },
    { title: 'TEI Selector', url: '/tool-selector/TEI-Selector', icon: 'color-wand', isOpen: false }
  ];

  selectedProjectId: [];
  projects: [];
  isLoggedIn: boolean = false;
  translations: [];

  constructor( private translate: TranslateService,
    private authService: AuthenticationService,
    private router: Router,
    private projectService: ProjectService,
    private alertController: AlertController,
    private menuController: MenuController) {
    this.initializeApp();
  }

  initializeApp(){
    this.translate.setDefaultLang('en');
    this.authService.isAuthenticated.subscribe(state => {
      if (state) {
        this.isLoggedIn = true;
        this.menuController.enable(true, 'main-content-menu');
        this.getProjects();
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/', { replaceUrl: true });
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

  async createProject(projectName) {
    this.projectService.createProject(projectName).subscribe(
      async (res) => {
        // Update list
        this.getProjects();
      },
      async (res) => {

      }
    );
  }

  selectProject() {
    this.projects.forEach( (project: Array<any>) => {
      if ( this.selectedProjectId === project['id'] ){
        localStorage.setItem('selectedProjectId', project['id']);
        localStorage.setItem('selectedProjectName', project['name']);
      }
    });
  }

  async createProjectPopup() {
    const alert = await this.alertController.create({
      header:  this.translate.instant('app.create-new-project.title'),
      subHeader: this.translate.instant('app.create-new-project.subtitle'),
      inputs: [
        {
          label: this.translate.instant('app.create-new-project.project-name-label'),
          name: 'name',
          type: 'text',
          placeholder: this.translate.instant('app.create-new-project.project-name-placeholder')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('app.create-new-project.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Do nothing
          }
        }, {
          text: this.translate.instant('app.create-new-project.ok'),
          handler: ( data ) => {
            // create project -> data.name
            this.createProject(data.name);
          }
        }
      ]
    });
    await alert.present();
  }

  private toggleIsOpen(page){
    if ( page.isOpen === true ) {
      page.isOpen = false;
    } else {
      page.isOpen = true;
    }
    if ( page.subPages === undefined ) {
      this.menuController.close();
    }
  }
}
