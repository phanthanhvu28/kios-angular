import { NgModule } from '@angular/core';
import { ROUTES, Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent
  },
  {
    path:'company',
    loadChildren:()=> import('../company/company.module').then(m=>m.CompanyModule)
  }
];

const companyRoute: Route = {
  path: 'company',
  loadChildren:()=> import('../company/company.module').then(m=>m.CompanyModule)
};

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
  providers:[
    {
      provide:ROUTES,
      useFactory:()=>{
        const layoutRoute: Route = {
          path: '',
          component: LayoutComponent,
          children: [

          ]
        }

        layoutRoute.children.push(companyRoute);
        return layoutRoute;
      },
      multi: true
    }
  ]
})
export class LayoutRoutingModule { }
