import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Publisher', url: '/component-selector/Publisher-Tool', icon: 'mail' },
    { title: 'Table of Contents Editor', url: '/component-selector/TOC-Editor', icon: 'list' },
    { title: 'Facsimile Tool', url: '/component-selector/Facsimile-Tool', icon: 'images' },
    { title: 'Entity Editor', url: '/component-selector/Entity-Editor', icon: 'file-tray' },
    { title: 'Event Editor', url: '/component-selector/Event-Editor', icon: 'git-compare' },
    { title: 'Log out', url: '/component-selector/LogOut', icon: 'warning' },
  ];

  constructor( private translate: TranslateService ) {
    this.initializeApp();
  }

  initializeApp(){
    this.translate.setDefaultLang('en');
  }
}
