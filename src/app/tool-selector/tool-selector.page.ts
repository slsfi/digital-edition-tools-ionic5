import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tool-selector',
  templateUrl: './tool-selector.page.html',
  styleUrls: ['./tool-selector.page.scss'],
})
export class ToolSelectorPage implements OnInit {
  public selectedComponent: string;
  public selectedComponentTool: string;

  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    this.selectedComponent = this.activatedRoute.snapshot.paramMap.get('id');
    this.selectedComponentTool = this.activatedRoute.snapshot.paramMap.get('tool');
    this.translate.setDefaultLang('en');
  }

}
