import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { PrismaClient } from '@prisma/client';
import prisma from '../../../prisma/prisma';

@Injectable({
  providedIn: 'root'
})

export class DataService{

  todos: Todo[] = [];

  private prisma: PrismaClient;

  constructor() {   
    this.prisma = new PrismaClient();
  }

  // getAllTodos(): Todo[] {
  //   return this.todos;
  // }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return todos;
  }

  // addTodo(todo: Todo): void {
  //   this.todos.push(todo);
  //   this.updateLocalStorage();
  // }

  async addTodo(text: string): Promise<void> {
    await this.prisma.todo.create({
      data: {
        text,
        completed: false
      }
    });
  }

  // updateTodo(index: number, updatedTodo: Todo): void {
  //   if (index >= 0 && index < this.todos.length) {
  //     this.todos[index] = updatedTodo;
  //     this.updateLocalStorage();
  //   }
  // }

  async updateTodo(id: string, updatedTodo: Todo): Promise<void> {
    await this.prisma.todo.update({
      where: { id },
      data: updatedTodo
    });
  }

  // deleteTodo(index: number): void {
  //   if (index >= 0 && index < this.todos.length) {
  //     this.todos.splice(index, 1);
  //     this.updateLocalStorage();
  //   }
  // }

  async deleteTodo(id: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { id }
    });
  }

  // private updateLocalStorage(): void {
  //   localStorage.setItem("todoList", JSON.stringify(this.todos));
  // }
}
