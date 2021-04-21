import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentSelectorPage } from './component-selector.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentSelectorRoutingModule {}
