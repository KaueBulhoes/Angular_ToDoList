import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, TodoItemComponent, MatDialogModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  todos?: Todo[]
  showValidationErrors?: boolean;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

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
  
  toogleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }
  
  editTodo(todo: Todo){
    const index = this.todos?.indexOf(todo);
  
    if (index !== undefined && index !== -1) { 
      let dialogRef = this.dialog.open(EditTodoDialogComponent, {
        width: '700px',
        data: todo
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.dataService.updateTodo(index, result)
        }
      })
    }
  }
  

}
