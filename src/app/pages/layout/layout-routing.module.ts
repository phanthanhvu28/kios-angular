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
        path:'role',
        loadChildren:()=> import('../role/role.module').then(m=>m.RoleModule)
      },
      {
        path:'staff',
        loadChildren:()=> import('../staff/staff.module').then(m=>m.StaffModule)
      },
      {
        path:'area',
        loadChildren:()=> import('../area/area.module').then(m=>m.AreaModule)
      },
      {
        path:'table',
        loadChildren:()=> import('../table/table.module').then(m=>m.TableModule)
      },
      {
        path:'type-sale',
        loadChildren:()=> import('../type-sale/type-sale.module').then(m=>m.TypeSaleModule)
      },
      {
        path:'type-bida',
        loadChildren:()=> import('../type-bida/type-bida.module').then(m=>m.TypeBidaModule)
      },
      {
        path:'403',
        loadChildren:()=> import('../page-error-forbidden/page-error-forbidden.module').then(m=>m.ForbiddenPageModule)
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
