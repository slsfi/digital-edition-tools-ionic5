import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: 'tool-selector/:tool',
    loadChildren: () => import('./tool-selector/tool-selector.module').then( m => m.ToolSelectorModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'tool-selector/:tool/:sub-tool',
    loadChildren: () => import('./tool-selector/tool-selector.module').then( m => m.ToolSelectorModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'facsimile-collection-modal',
    loadChildren: () => import('./components/modals/facsimile-collection-modal/facsimile-collection-modal.module').then( m => m.FacsimileCollectionModalPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
