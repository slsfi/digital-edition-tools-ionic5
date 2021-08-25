import { VersionGridComponent } from './components/grids/version-grid/version-grid.component';
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
import { XmlEntitySelectorGridComponent } from './components/grids/xml-entity-selector-grid/xml-entity-selector-grid.component';
import { WorkGridComponent } from './components/grids/work-grid/work-grid.component';
import { LocationGridComponent } from './components/grids/location-grid/location-grid.component';
import { HotTableModule } from '@handsontable/angular';
import { PublicationGridComponent } from './components/grids/publication-grid/publication-grid.component';
import { CollectionGridComponent } from './components/grids/collection-grid/collection-grid.component';
import { ManuscriptGridComponent } from './components/grids/manuscript-grid/manuscript-grid.component';
import { FacsimileCollectionGridComponent } from './components/grids/facsimile-collection-grid/facsimile-collection-grid.component';
import { FacsimileUploadComponent } from './components/tools/facsimile-upload/facsimile-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
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
    GitGridComponent,
    XmlEntitySelectorGridComponent,
    WorkGridComponent,
    LocationGridComponent,
    PublicationGridComponent,
    CollectionGridComponent,
    VersionGridComponent,
    ManuscriptGridComponent,
    FacsimileCollectionGridComponent,
    FacsimileUploadComponent
  ],
  imports: [IonicModule, AgGridModule, CommonModule, FormsModule, DragDropModule, HotTableModule, FileUploadModule],
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
    GitGridComponent,
    XmlEntitySelectorGridComponent,
    WorkGridComponent,
    LocationGridComponent,
    PublicationGridComponent,
    CollectionGridComponent,
    VersionGridComponent,
    ManuscriptGridComponent,
    FacsimileCollectionGridComponent,
    FacsimileUploadComponent
  ]
})
export class ComponentsModule {}
