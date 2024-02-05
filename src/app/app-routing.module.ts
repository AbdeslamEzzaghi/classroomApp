import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const approutes: Routes = [
  { path: '', redirectTo: '/stagiaires', pathMatch: 'full' },
  //{path:'auth',component:AuthComponent},
  {
    path: 'stagiaires',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },{
    path: 'absents-liste',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then((m) => m.ShoppingListModule),
  },{
    path: 'emploi',
    loadChildren: () =>
      import('./emploi/emploi.module').then((m) => m.EmploiModule),
  },
  //loadChildren : './recipes/recipes.module#RecipesModule'
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(approutes,{preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}  
