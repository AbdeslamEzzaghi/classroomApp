import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmploiComponent } from './emploi.component';



@NgModule({
  declarations: [
    EmploiComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'',component:EmploiComponent}
    ]),
    FormsModule
  ]
}) 
export class EmploiModule { }
 