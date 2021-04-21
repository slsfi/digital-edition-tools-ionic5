import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-component-selector',
  templateUrl: './component-selector.page.html',
  styleUrls: ['./component-selector.page.scss'],
})
export class ComponentSelectorPage implements OnInit {
  public selectedComponent: string;

  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    this.selectedComponent = this.activatedRoute.snapshot.paramMap.get('id');
    this.translate.setDefaultLang('en');
  }

}
