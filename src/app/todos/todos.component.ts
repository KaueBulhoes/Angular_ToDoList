import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  todos?: Todo[]
  showValidationErrors?: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      this.showValidationErrors = true;
      return;
    }
    
    this.dataService.addTodo(new Todo(form.value.text));

    this.showValidationErrors = false

    form.reset()
  }
  

}
