import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facsimile-tool',
  templateUrl: './facsimile-tool.component.html',
  styleUrls: ['./facsimile-tool.component.scss'],
})
export class FacsimileToolComponent implements OnInit {

  @Input() public selectedComponentTool: string;

  constructor() { }

  ngOnInit() {}

}
