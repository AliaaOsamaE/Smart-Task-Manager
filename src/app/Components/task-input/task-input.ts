import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInput {
  private taskService = inject(TaskService);
  private router = inject(Router);

  title = '';
  desc = '';
  priority = 'Low';
  date = '';
  category = '';

  showSuccess = false;
  showError = false;
  errorMessage = '';

  async addTask(): Promise<void> {
    this.showSuccess = false;
    this.showError = false;
    this.errorMessage = '';

    if (!this.title || !this.desc || !this.priority || !this.date || !this.category) {
      this.showError = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: this.title,
      desc: this.desc,
      priority: this.priority,
      date: this.date,
      category: this.category,
      state: 'NotDone'
    };

    await this.taskService.addTask(newTask);
    this.showSuccess = true;
    this.resetForm();
    setTimeout(() => {
      this.router.navigate(['/layout/all-tasks']);
    }, 1000);
  }

  private resetForm(): void {
    this.title = '';
    this.desc = '';
    this.priority = 'Low';
    this.date = '';
    this.category = '';
  }
}