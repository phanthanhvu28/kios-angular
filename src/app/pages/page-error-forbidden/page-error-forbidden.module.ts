import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageErrorForbiddenComponent } from "./page-error-forbidden.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/pipes/pipes.module";
import { BaseButtonModule } from "@common-components/base-button/base-button.module";

const routes: Routes = [
    {
      path: '',
      component: PageErrorForbiddenComponent
    }
  ];
  
  @NgModule({
    declarations: [PageErrorForbiddenComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PipesModule,
      BaseButtonModule,
      RouterModule.forChild(routes)
    ]
  })
  export class ForbiddenPageModule {}