import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, TodosComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit{

  @Input() todo?: Todo;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
    
  }

  onTodoClicked(){
    this.todoClicked.emit();
  }

  onEditClicked(){
    this.editClicked.emit();
  }
}
