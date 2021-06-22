import { NgModule } from '@angular/core';
import { PublisherToolComponent } from './components/tools/publisher-tool/publisher-tool.component';
import { IonicModule } from '@ionic/angular';
import { TocEditorComponent } from './components/tools/toc-editor/toc-editor.component';
import { EntityEditorComponent } from './components/tools/entity-editor/entity-editor.component';
import { EventEditorComponent } from './components/tools/event-editor/event-editor.component';
import { FacsimileToolComponent } from './components/tools/facsimile-tool/facsimile-tool.component';
import { TeiSelectorComponent } from './components/tools/tei-selector/tei-selector.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TocGridComponent } from './components/grids/toc-grid/toc-grid.component';
import { ProjectGridComponent } from './components/grids/project-grid/project-grid.component';
import { SubjectGridComponent } from './components/grids/subject-grid/subject-grid.component';
import { GitGridComponent } from './components/grids/git-grid/git-grid.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

/*
All available tools and sub tools need to imported here.

*/

@NgModule({
  declarations: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent,
    ProjectGridComponent,
    LandingPageComponent,
    SubjectGridComponent,
    TocGridComponent,
    GitGridComponent
  ],
  imports: [IonicModule, AgGridModule, CommonModule, FormsModule, DragDropModule],
  exports: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent,
    ProjectGridComponent,
    SubjectGridComponent,
    LandingPageComponent,
    TocGridComponent,
    GitGridComponent
  ]
})
export class ComponentsModule {}
