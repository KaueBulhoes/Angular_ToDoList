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
    if(form.invalid){
      this.showValidationErrors = true;
      return;
    }
    
    if (form.valid) {
      // Crie um novo objeto Todo
      const newTodo: Todo = {
        id: uuidv4(),
        text: form.value.text,
        completed: false // Defina o padrão para nova tarefa como não completada
      };
  
      // Chame a função addTodo do data.service para adicionar o novo Todo
      this.dataService.addTodo(newTodo).subscribe({
        next: (todo) => {
          this.todos?.push(todo);
        },
        error: (error) => {
          console.error('Erro ao adicionar novo Todo:', error);
        }
      });
      this.showValidationErrors = false;
      form.reset();
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  
    // Chama o service para atualizar o todo
    this.dataService.updateTodo(todo.id, todo)
      .subscribe({
        next: (updatedTodo) => {
          // Encontra o índice do todo na lista local, se necessário
          const index = this.todos?.findIndex(t => t.id === updatedTodo.id);
          // Atualiza o todo na lista local, se necessário
          if (index !== undefined && index !== -1) {
            // Usamos splice para substituir o todo antigo pelo atualizado
            if (this.todos) {
              this.todos.splice(index, 1, updatedTodo);
            }
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar todo:', error);
          // Reverte o valor de completed se houver um erro
          todo.completed = !todo.completed;
        }
      });
  }
  
  
  

  editTodo(todo: Todo) {
    const index = this.todos?.indexOf(todo);

    if (index !== undefined && index !== -1) {
      let dialogRef = this.dialog.open(EditTodoDialogComponent, {
        width: '700px',
        data: todo
      });

      dialogRef.afterClosed().subscribe((result: Todo) => {
        if (result) {
          this.dataService.updateTodo(todo.id, result)
            .subscribe({
              next: (updateTodo) => {
                this.todos?.splice(index, 1, updateTodo);
              }
            })
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
