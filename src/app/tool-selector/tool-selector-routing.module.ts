import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolSelectorPage } from './tool-selector.page';
import { AuthGuard } from '../guards/auth.guard';
import { AutoLoginGuard } from '../guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    component: ToolSelectorPage,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolSelectorRoutingModule {}
