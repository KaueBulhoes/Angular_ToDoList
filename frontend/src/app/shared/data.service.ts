import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})

export class DataService{

  todos: Todo[] = [];

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.updateLocalStorage();
  }

  updateTodo(index: number, updatedTodo: Todo): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
      this.updateLocalStorage();
    }
  }


  deleteTodo(index: number): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem("todoList", JSON.stringify(this.todos));
  }
}
