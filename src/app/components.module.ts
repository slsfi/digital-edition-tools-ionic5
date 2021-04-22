import { NgModule } from '@angular/core';
import { PublisherToolComponent } from './components/publisher-tool/publisher-tool.component';
import { IonicModule } from '@ionic/angular';
import { TocEditorComponent } from './components/toc-editor/toc-editor.component';
import { EntityEditorComponent } from './components/entity-editor/entity-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { FacsimileToolComponent } from './components/facsimile-tool/facsimile-tool.component';
import { TeiSelectorComponent } from './components/tei-selector/tei-selector.component';
import { GridPublicationsComponent } from './components/common-grids/grid-publications/grid-publications.component';
import { DialogDataComponent } from './components/common-dialog/dialog-data/dialog-data.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent,
    GridPublicationsComponent,
    DialogDataComponent
  ],
  imports: [IonicModule, AgGridModule, CommonModule],
  exports: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent,
    GridPublicationsComponent,
    DialogDataComponent
  ]
})
export class ComponentsModule {}
