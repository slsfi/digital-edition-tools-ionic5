import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacsimileCollectionModalPage } from './facsimile-collection-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FacsimileCollectionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacsimileCollectionModalPageRoutingModule {}
