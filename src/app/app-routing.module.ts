import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'component-selector/Publisher-Tool',
    pathMatch: 'full'
  },
  {
    path: 'component-selector/:id',
    loadChildren: () => import('./component-selector/component-selector.module').then( m => m.ComponentSelectorModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
