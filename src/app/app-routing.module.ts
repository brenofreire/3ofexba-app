import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),        
      },
      {
        path: 'campanha/:tipoCampanha',
        loadChildren: () => import('./pages/home/tarefas/tarefas-routing.module').then(m => m.TarefasPageRoutingModule)
      }
    ]
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/home-admin/home-admin.module').then(m => m.HomeAdminPageModule)
  },
  {
    path: 'home-regional',
    loadChildren: () => import('./pages/home-regional/home-regional.module').then(m => m.HomeRegionalPageModule)
  },
  {
    path: 'agostinho',
    loadChildren: () => import('./pages/agostinho/agostinho.module').then(m => m.AgostinhoPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
