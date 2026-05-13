import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  editingTodo: any = null;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = [...todos];
      this.cdr.detectChanges();
    });
  }

  addTodo() {
    console.log('Add todo clicked:', this.newTodoTitle);
    if (!this.newTodoTitle.trim()) return;
    
    const newTodo: Todo = {
      id: 0,
      title: this.newTodoTitle,
      isComplete: false,
      createdAt: new Date()
    };
    
    this.todoService.createTodo(newTodo).subscribe(todo => {
      this.todos = [...this.todos, todo];
      this.newTodoTitle = '';
      this.cdr.detectChanges();
      
      // Force focus back to input
      setTimeout(() => {
        const input = document.querySelector('.add-todo input') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    });
  }

  toggleTodo(todo: Todo) {
    const originalStatus = todo.isComplete;
    todo.isComplete = !todo.isComplete;
    
    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: () => {
        this.todos = this.todos.map(t => 
          t.id === todo.id ? { ...todo } : t
        );
        this.cdr.detectChanges();
      },
      error: () => {
        // Revert on error
        todo.isComplete = originalStatus;
        this.cdr.detectChanges();
      }
    });
  }

  deleteTodo(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.cdr.detectChanges();
      });
    }
  }

  startEdit(todo: Todo) {
    this.editingTodo = { ...todo };
    this.cdr.detectChanges();
    
    // Focus the edit input after view updates
    setTimeout(() => {
      const editInput = document.querySelector('.todo-edit input') as HTMLInputElement;
      if (editInput) editInput.focus();
    }, 100);
  }

  saveEdit() {
    if (this.editingTodo && this.editingTodo.title.trim()) {
      this.todoService.updateTodo(this.editingTodo.id, this.editingTodo).subscribe(() => {
        this.todos = this.todos.map(t => 
          t.id === this.editingTodo.id ? { ...this.editingTodo } : t
        );
        this.editingTodo = null;
        this.cdr.detectChanges();
      });
    } else {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.cdr.detectChanges();
  }
}