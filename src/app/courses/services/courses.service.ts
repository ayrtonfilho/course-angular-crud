import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from './../model/course';



@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  constructor(private httpClient: HttpClient) {} //injeção de dependência no constructor.
  // list(): Course[]{ //retornamos uma lista de cursos para o componente 'course.component.ts'
  //   return [
  //     { _id: '1', name: 'Angular', category: 'font-end' },
  //     { _id: '2', name: 'JavaScript Avançado', category: 'back-end' },
  //     { _id: '3', name: 'JavaScript Básico', category: 'front-end' },
  //     { _id: '3', name: 'PromoTop', category: 'Não Disponível' }
  //   ];
  // }

  // private readonly API = 'api/courses/';
  private readonly API = 'assets/courses.json';

  list(){
    return this.httpClient.get<Course[]>(this.API).pipe(
      // take(1),
      first(), //encerra a inscrição depois de trazer o JSON.
      delay(800),
      tap(course => console.log(course))
    );
  }

}
