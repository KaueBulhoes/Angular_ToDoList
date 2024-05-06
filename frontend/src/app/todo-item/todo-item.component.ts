import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { FormsModule } from '@angular/forms';
import tippy from 'tippy.js';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit, AfterViewInit{

  @Input() todo?: Todo;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();

  @ViewChild('editBtn') editBtnElRef?: ElementRef<HTMLElement>
  @ViewChild('deleteBtn') deleteBtnElRef?: ElementRef<HTMLElement>
  
  constructor(){}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // if (document) {
    //   if (this.editBtnElRef && this.editBtnElRef.nativeElement) {
    //     tippy(this.editBtnElRef.nativeElement, {
    //       content: 'Edit'
    //     });
    //   }
    //   if (this.deleteBtnElRef && this.deleteBtnElRef.nativeElement) {
    //     tippy(this.deleteBtnElRef.nativeElement, {
    //       content: 'Delete'
    //     });
    //   }
    // }
  }

  onTodoClicked(){
    this.todoClicked.emit();
  }

  onEditClicked(){
    this.editClicked.emit();
  }

  onDeleteClicked(){
    this.deleteClicked.emit();
  }
}
