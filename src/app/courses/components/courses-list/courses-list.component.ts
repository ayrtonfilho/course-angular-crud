import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false)
  @Output() update = new EventEmitter(false)
  
  readonly displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(
    private CoursesService: CoursesService,
    private errorSnackBar: MatSnackBar
    ) {}

  ngOnInit(): void {}

  onAdd(){
    // this.router.navigate(['new'], { relativeTo: this.route })
    this.add.emit(true);
  }


  onDelete(id: number){
    this.CoursesService.delete(id).subscribe(
      data => this.onSucessDelete(), error => this.onErrorDelete()
    );
  }

  private onSucessDelete(){
    this.errorSnackBar.open("Curso deletado com sucesso!", "Ok", {duration: 5000})
    
  }

  private onErrorDelete(){
    this.errorSnackBar.open("Erro ao deletar curso!", "Ok", {duration: 5000})
  }

  onUpdate(course: Course){
    this.update.emit(course)
  }

}
