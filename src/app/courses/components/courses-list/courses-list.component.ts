import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false)
  @Output() update = new EventEmitter(false)
  @Output() delete = new EventEmitter(false)

  readonly displayedColumns = ['id', 'name', 'category', 'actions'];

  ngOnInit(): void {}

  onAdd(){ this.add.emit(true); }

  onDelete(course: Course){ this.delete.emit(course) }

  onUpdate( course: Course){ this.update.emit(course) }

}
