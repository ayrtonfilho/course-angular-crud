import { Location } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private services: CoursesService,
    private errorSnackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];//dados que vem do meu guards
    // console.log(course);
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    })
  }

  
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

