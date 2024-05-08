import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, TodoItemComponent, MatDialogModule, HttpClientModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  todos?: Todo[]
  showValidationErrors?: boolean;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTodos();
    // this.todos = this.dataService.getAllTodos()
  }

  loadTodos() {
    this.dataService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        console.error('Erro ao carregar todos:', error);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    // if (form.valid) {
    const newTodo: Todo = {
      id: uuidv4(),
      text: form.value.text,
      completed: false // Padrão para nova tarefa
    };

    this.dataService
      .addTodo(newTodo)
      .subscribe(todo => this.todos?.push(todo));
    // }
    form.reset();
  }

  toogleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
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

  deleteClicked(todo: Todo) {

    const index = this.todos?.indexOf(todo);
    
    if (index !== undefined && index !== -1) {
      this.dataService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.todos?.splice(index, 1);
        },
      });
    }

    // const index = this.todos?.indexOf(todo);
    // if (index !== undefined && index !== -1) {
    //   this.dataService
    //   .deleteTodo(index)
    //   .subscribe();
    // } return
  }

}
