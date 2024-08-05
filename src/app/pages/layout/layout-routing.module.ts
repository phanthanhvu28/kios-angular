import { NgModule } from '@angular/core';
import { ROUTES, Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '@pages/login/login.component';

const routes: Routes = [
  {
    path:'login',
    loadChildren:()=> import('../login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'company',
        loadChildren:()=> import('../company/company.module').then(m=>m.CompanyModule)
      },
      {
        path:'store',
        loadChildren:()=> import('../store/store.module').then(m=>m.StoreModule)
      },
      {
        path:'user',
        loadChildren:()=> import('../user/user.module').then(m=>m.UserModule)
      },
      {
        path:'staff',
        loadChildren:()=> import('../staff/staff.module').then(m=>m.StaffModule)
      }
    ]
  } 
];

const companyRoute: Route = {
  path: 'company',
  loadChildren:()=> import('../company/company.module').then(m=>m.CompanyModule)
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    // {
    //   provide:ROUTES,
    //   useFactory:()=>{
    //     const layoutRoute: Route = {
    //       path: '',
    //       component: LayoutComponent,
    //       children: [
    //         {
    //           path: 'login',
    //           component: LoginComponent
    //         }
    //       ]
    //     }

    //     layoutRoute.children.push(companyRoute);
    //     return layoutRoute;
    //   },
    //   multi: true
    // }
  ]
})
export class LayoutRoutingModule { }
