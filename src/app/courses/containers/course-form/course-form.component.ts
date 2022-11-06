import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private services: CoursesService,
    private router: Router,
    private errorSnackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {}

  
  onCancel(){
    this.location.back();
  }



  onSubmit(){
    this.services.save(this.form.value).subscribe(
      data => this.onSucess(), error => this.onError());
  }
  private onError(): void{
    this.errorSnackBar.open("Erro ao salvar curso!", "Ok", {duration: 5000})
  }
  private onSucess(){
    this.errorSnackBar.open("Operação realizada com sucesso!", "Ok", {duration: 5000})
    this.onCancel();
  }

}

