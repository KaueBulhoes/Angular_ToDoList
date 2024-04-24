import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  todos: Todo[] = [
    new Todo('this is a test!', true),
    new Todo('lorem ')
  ]

  constructor() { }

  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos?.push(todo);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    if (this.todos && index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
    } else {
      console.error('Index out of bounds or todos is null.');
    }
  }


  deleteTodo(index: number) {
    this.todos?.splice(index, 1);
  }

}
