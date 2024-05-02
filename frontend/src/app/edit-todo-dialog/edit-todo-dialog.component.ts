import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, NgIf, TodosComponent, MatDialogModule],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})

export class EditTodoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ){}

  ngOnInit(): void {
    
  }

  onFormSubmit(form: NgForm){
    if(form.invalid) return
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }

    this.dialogRef.close(updatedTodo)
  }

  close(){
    this.dialogRef.close()
  }
}
