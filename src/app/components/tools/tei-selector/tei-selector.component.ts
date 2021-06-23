import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tei-selector',
  templateUrl: './tei-selector.component.html',
  styleUrls: ['./tei-selector.component.scss'],
})
export class TeiSelectorComponent implements OnInit {

  public selectedFileFullPath: string = null;

  constructor() { }

  ngOnInit() {}

  public setSelectedFileFullPath( event: Event) {
    this.selectedFileFullPath = String(event);
  }

}
