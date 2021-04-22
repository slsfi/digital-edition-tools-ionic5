import { NgModule } from '@angular/core';
import { PublisherToolComponent } from './components/publisher-tool/publisher-tool.component';
import { IonicModule } from '@ionic/angular';
import { TocEditorComponent } from './components/toc-editor/toc-editor.component';
import { EntityEditorComponent } from './components/entity-editor/entity-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { FacsimileToolComponent } from './components/facsimile-tool/facsimile-tool.component';
import { TeiSelectorComponent } from './components/tei-selector/tei-selector.component';

@NgModule({
  declarations: [PublisherToolComponent, TocEditorComponent, EntityEditorComponent, EventEditorComponent, FacsimileToolComponent, TeiSelectorComponent],
  imports: [IonicModule],
  exports: [PublisherToolComponent, TocEditorComponent, EntityEditorComponent, EventEditorComponent, FacsimileToolComponent, TeiSelectorComponent]
})
export class ComponentsModule {}
