import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacsimileCollectionModalPageRoutingModule } from './facsimile-collection-modal-routing.module';

import { FacsimileCollectionModalPage } from './facsimile-collection-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacsimileCollectionModalPageRoutingModule
  ],
  declarations: [FacsimileCollectionModalPage]
})
export class FacsimileCollectionModalPageModule {}
