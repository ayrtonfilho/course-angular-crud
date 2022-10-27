import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shareds/components/error-dialog/error-dialog.component';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {

  // coursesService: CoursesService;

  courses$: Observable<Course[]>;
  displayedColumns = ['id', 'name', 'category', 'actions'];  /*Informo ao Angular quais os meus dados serão trazidos do arquivo 'course.ts'*/

  constructor(
    private CoursesService: CoursesService,

    public dialog: MatDialog
  ) { //realizamos injeção do HttpService dentro do Cursos Component
    // this.courses = []; Posso inicializar dessa forma também.
    // this.coursesService =  new CoursesService(); //instacio o meu Obj CoursesService.
    // this.courses = this.CoursesService.list(); //Peço para que busque no 'services/courses.service.ts' o arquivo que contém as informações dos cursos a serem listados
    this.courses$ = this.CoursesService.list()
      .pipe(
        catchError(error => {
          // this.onError("Código do erro: " + error.status +" "+ error.statusText)
          this.onError(error)

          if (error.status == 404) {
            error.textTitle = "Desculpe, nós que erramos! :´(";
          } else {
            error.textTitle = "Algo de errado! :(";
          }

          return of([])
        })
      );
  }

  // Retorna o obj erro para a Página de erro.
  onError(errorMsg: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    // this.courses = this.CoursesService.list(); //Somente na hora que o componente é inicializado.
  }

}
