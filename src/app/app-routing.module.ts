import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
      {
        path:'',
        loadChildren:()=> import('./pages/layout/layout.module').then(m=>m.LayoutModule)
      },
    { path: '**', redirectTo: '/404' }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}