import { NgModule } from '@angular/core';
import { PublisherToolComponent } from './components/tools/publisher-tool/publisher-tool.component';
import { IonicModule } from '@ionic/angular';
import { TocEditorComponent } from './components/tools/toc-editor/toc-editor.component';
import { EntityEditorComponent } from './components/tools/entity-editor/entity-editor.component';
import { EventEditorComponent } from './components/tools/event-editor/event-editor.component';
import { FacsimileToolComponent } from './components/tools/facsimile-tool/facsimile-tool.component';
import { TeiSelectorComponent } from './components/tools/tei-selector/tei-selector.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent
  ],
  imports: [IonicModule, AgGridModule, CommonModule, FormsModule],
  exports: [
    PublisherToolComponent,
    TocEditorComponent,
    EntityEditorComponent,
    EventEditorComponent,
    FacsimileToolComponent,
    TeiSelectorComponent
  ]
})
export class ComponentsModule {}
