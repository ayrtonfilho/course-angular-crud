import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shareds/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from '../../../shareds/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {

  // coursesService: CoursesService;

  courses$!: Observable<Course[]>;
  // displayedColumns = ['id', 'name', 'category', 'actions'];  /*Informo ao Angular quais os meus dados serão trazidos do arquivo 'course.ts'*/
  courseLenght = true;

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private errorSnackBar: MatSnackBar
  ) { //realizamos injeção do HttpService dentro do Cursos Component
    // this.courses = []; Posso inicializar dessa forma também.
    // this.coursesService =  new CoursesService(); //instacio o meu Obj CoursesService.
    // this.courses = this.CoursesService.list(); //Peço para que busque no 'services/courses.service.ts' o arquivo que contém as informações dos cursos a serem listados

    this.onRefresh();
  }

  onRefresh(){
    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(error => {
        // this.onError("Código do erro: " + error.status +" "+ error.statusText)
        this.onError(error)
        return of([])
      })
    );

    this.courses$.subscribe(//verifica se há cursos para serem listados.
      data => {
        if(data.length == 0) {this.courseLenght = true}
        else{this.courseLenght = false}
        console.log(data);
      }
    );
  }
  // Retorna o obj erro para a Página de erro.
  onError(errorMsg: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {}

  //btn de Update
  onUpdate(course: Course){
    this.router.navigate(['update', course.id], { relativeTo: this.route })
  }

  //btn de Add
  onAdd(){
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  //btn de Delete
  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja exlcuir esse curso?',
    });

    dialogRef.afterClosed().subscribe( (result: boolean) => {

      if (result){ // caso o usuário clique em sim, a gente apaga o curso!

        this.CoursesService.delete(course.id).subscribe(
          () => {
            this.onRefresh();
            this.errorSnackBar.open("Curso deletado com sucesso!", "Ok", {duration: 5000, verticalPosition: "top", horizontalPosition: 'center'})
          },
          error => this.onError("Erro ao deletar o curso!")
        );

      }

      });

  }
}
