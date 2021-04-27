import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-tool',
  templateUrl: './publisher-tool.component.html',
  styleUrls: ['./publisher-tool.component.scss'],
})
export class PublisherToolComponent implements OnInit {
  @Input() public selectedComponentTool: string;

  constructor() {

  }

  ngOnInit() {
    console.log(this.selectedComponentTool)
  }

}
