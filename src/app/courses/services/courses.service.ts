import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

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

  private readonly API = 'api/courses/';
  // private readonly API = 'assets/courses.json';
  
  list(){
    return this.httpClient.get<Course[]>(this.API).pipe(
      // take(1),
      first(), //encerra a inscrição depois de trazer o JSON.
      // delay(800),
      // tap(course => console.log(course))
    );
  }

  
  loadById(id: string){
    return this.httpClient.get<Course>(this.API + id);
  }
  
  delete(id: number){
    return this.httpClient.delete<Course[]>(this.API + id).pipe(first());
  }
  
  save(record: Partial<Course>){
    if(record.id){//se o registro possui ID
      // console.log("Update!")
      return this.update(record);
    }else{
      // console.log("Create!")
      return this.create(record);
    }
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course[]>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course[]>(this.API + record.id, record).pipe(first());
  }

}
