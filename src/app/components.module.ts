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
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    TocGridComponent
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
    LandingPageComponent,
    TocGridComponent
  ]
})
export class ComponentsModule {}
