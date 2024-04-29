import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import prisma from '../../../prisma/prisma';
 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [];

  constructor() {
    if (typeof window !== 'undefined') {}; 
  }

  async getAllTodos() {
    // Recupera todos os itens da tabela Todo no banco de dados
    const todos = await prisma.todo.findMany();
    return todos;
  }

  async addTodo(todo: Todo): Promise<void> {
    // Cria um novo todo no banco de dados usando o Prisma Client
    await prisma.todo.create({
      data: {
        text: todo.text,
        completed: todo.completed,
        // Adicione quaisquer outros campos necessários aqui
      }
    });
  }

  private async getExistingTodo(id: number) {
    // Verifica se o todo com o ID fornecido existe no banco de dados
    return await prisma.todo.findUnique({
      where: { id }
    });
  }

  async updateTodo(id: number, updatedTodo: Todo): Promise<void> {
    // Verifica se o todo existe
    const existingTodo = await this.getExistingTodo(id);

    // Se o todo existir, atualiza-o com os novos valores
    if (existingTodo) {
      await prisma.todo.update({
        where: { id },
        data: {
          text: updatedTodo.text,
          completed: updatedTodo.completed,
          // Adicione quaisquer outros campos necessários aqui
        }
      });
    }
  }

  async deleteTodo(id: number): Promise<void> {
    // Verifica se o todo existe
    const existingTodo = await this.getExistingTodo(id);

    // Se o todo existir, exclui-o do banco de dados
    if (existingTodo) {
      await prisma.todo.delete({
        where: { id }
      });
    }
  }
}
