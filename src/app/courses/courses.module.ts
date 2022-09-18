import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MaterialModule } from '../shareds/app-material/materialAngular.module';
import { SharedModule } from '../shareds/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})

export class CoursesModule { }
