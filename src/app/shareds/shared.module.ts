import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './app-material/materialAngular.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    MaterialModule
  ]
})

export class SharedModule { }
