import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidDisplayValuePipe } from './valid-display-value.pipe';


const PIPES_MODULE = [
  ValidDisplayValuePipe
];
@NgModule({
  declarations: [...PIPES_MODULE],
  imports: [
    CommonModule
  ],
  exports: [...PIPES_MODULE]
})
export class PipesModule { }
