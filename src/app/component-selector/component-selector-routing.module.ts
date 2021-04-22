import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentSelectorPage } from './component-selector.page';
import { AuthGuard } from '../guards/auth.guard';
import { AutoLoginGuard } from '../guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    component: ComponentSelectorPage,
    canLoad: [AutoLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentSelectorRoutingModule {}
