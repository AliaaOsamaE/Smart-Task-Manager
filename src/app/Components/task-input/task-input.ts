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
  // Inject services
  private taskService = inject(TaskService);
  private router = inject(Router);

  // Form fields
  title = '';
  desc = '';
  priority = 'Low';
  date = '';
  category = '';

  // UI state
  showSuccess = false;
  showError = false;
  errorMessage = '';

  /**
   * Add a new task
   */
  async addTask(): Promise<void> {
    // Reset messages
    this.showSuccess = false;
    this.showError = false;
    this.errorMessage = '';

    // Validate form
    if (!this.title || !this.desc || !this.priority || !this.date || !this.category) {
      this.showError = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Create new task object
    const newTask: Task = {
      id: Date.now().toString(), // Simple ID generation
      title: this.title,
      desc: this.desc,
      priority: this.priority,
      date: this.date,
      category: this.category,
      state: 'NotDone' // New tasks are not done by default
    };

    // Add task via service (uses async/await with firstValueFrom)
    try {
      await this.taskService.addTask(newTask);
      this.showSuccess = true;
      // Reset form
      this.resetForm();
      // Navigate to all tasks after 1 second
      setTimeout(() => {
        this.router.navigate(['/layout/all-tasks']);
      }, 1000);
    } catch (error) {
      console.error('Error adding task:', error);
      this.showError = true;
      this.errorMessage = 'Failed to add task. Please try again.';
    }
  }

  /**
   * Reset form fields
   */
  private resetForm(): void {
    this.title = '';
    this.desc = '';
    this.priority = 'Low';
    this.date = '';
    this.category = '';
  }
}