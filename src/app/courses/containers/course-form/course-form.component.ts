import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''] ,
    name: ['' , [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(90)
    ]],
    category: ['' , [Validators.required]]
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

  getErrorMessage(fieldName: string){

    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return "Este campo é obrigatório!";
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres!`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 90;
      return `Tamanho máximo não pode exceder ${requiredLength} caracteres!`;
    }

    return 'Campo inválido!';
  }
}

