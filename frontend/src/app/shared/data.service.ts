import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/todos';

  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    // Verifica se o código está sendo executado no ambiente do navegador antes de acessar o localStorage
    // if (typeof window !== 'undefined') {
    //   // Recupera a lista de todos do armazenamento local ao inicializar o serviço
    //   const storedTodos = localStorage.getItem("todoList");
    //   this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    // }
  }

   // getAllTodos(): Todo[] {
  //   return this.todos;
  // }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // addTodo(todo: Todo): void {
  //   this.todos.push(todo);
  //   this.updateLocalStorage();
  // }

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(this.apiUrl, todo, { headers });
    // return this.http.post<Todo>(this.apiUrl, todo);
  }

  // updateTodo(index: number, updatedTodo: Todo): void {
  //   if (index >= 0 && index < this.todos.length) {
  //     this.todos[index] = updatedTodo;
  //     this.updateLocalStorage();
  //   }
  // }

  updateTodo(id: number, updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }

  // deleteTodo(index: number): void {
  //   if (index >= 0 && index < this.todos.length) {
  //     this.todos.splice(index, 1);
  //     this.updateLocalStorage();
  //   }
  // }

  deleteTodo(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(url, { headers });
  }

  // private updateLocalStorage(): void {
  //   localStorage.setItem("todoList", JSON.stringify(this.todos));
  // }
}
