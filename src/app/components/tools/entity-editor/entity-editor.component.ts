import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss'],
})
export class EntityEditorComponent implements OnInit {
  @Input() public selectedComponentTool: string;
  constructor() { }

  ngOnInit() {
    console.log(this.selectedComponentTool)
  }

}
