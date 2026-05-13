import { Component, OnInit } from '@angular/core';
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

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    
    const newTodo: Todo = {
      id: 0,
      title: this.newTodoTitle,
      isComplete: false,
      createdAt: new Date()
    };
    
    this.todoService.createTodo(newTodo).subscribe(todo => {
      this.todos.push(todo);
      this.newTodoTitle = '';
    });
  }

  toggleTodo(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.updateTodo(todo.id, todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  startEdit(todo: Todo) {
    this.editingTodo = { ...todo };
  }

  saveEdit() {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo.id, this.editingTodo).subscribe(() => {
        const index = this.todos.findIndex(t => t.id === this.editingTodo.id);
        if (index !== -1) {
          this.todos[index] = { ...this.editingTodo };
        }
        this.editingTodo = null;
      });
    }
  }

  cancelEdit() {
    this.editingTodo = null;
  }
}
