import { NgModule } from '@angular/core';
import { PublisherToolComponent } from './components/publisher-tool/publisher-tool.component';
import { IonicModule } from '@ionic/angular';
import { TocEditorComponent } from './components/toc-editor/toc-editor.component';
import { EntityEditorComponent } from './components/entity-editor/entity-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { FacsimileToolComponent } from './components/facsimile-tool/facsimile-tool.component';

@NgModule({
  declarations: [PublisherToolComponent, TocEditorComponent, EntityEditorComponent, EventEditorComponent, FacsimileToolComponent],
  imports: [IonicModule],
  exports: [PublisherToolComponent, TocEditorComponent, EntityEditorComponent, EventEditorComponent, FacsimileToolComponent]
})
export class ComponentsModule {}
