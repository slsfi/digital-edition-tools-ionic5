import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
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
    { title: 'TEI Selector', url: '/component-selector/TEI-Selector', icon: 'color-wand' }
  ];

  constructor( private translate: TranslateService,
    private authService: AuthenticationService,
    private router: Router ) {
    this.initializeApp();
  }

  initializeApp(){
    this.translate.setDefaultLang('en');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
