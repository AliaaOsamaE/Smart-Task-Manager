import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../types';

/**
 * NotDone Component - Displays only incomplete tasks (state === 'NotDone')
 *
 * This component:
 * - Fetches tasks from TaskService
 * - Filters and displays only tasks with state 'NotDone'
 * - Shows a message if no incomplete tasks exist
 */
@Component({
  selector: 'app-not-done',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './not-done.html',
  styleUrl: './not-done.css'
})
export class NotDone implements OnInit {
  // Inject TaskService
  taskService = inject(TaskService);

  // Store all tasks and filter for not done tasks
  allTasks: Task[] = [];

  // Get only not done tasks
  get tasks() {
    return this.allTasks.filter(task => task.state === 'NotDone');
  }

  ngOnInit(): void {
    // Fetch tasks when component initializes using Observable
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        console.log('Not done tasks loaded successfully');
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  /**
   * Handle task deletion
   * @param taskId - ID of the task to delete
   */
  async onDeleteTask(taskId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.taskService.deleteTask(taskId);
        console.log('Task deleted successfully');
        // Refresh tasks after deletion
        this.taskService.getAllTasks().subscribe(tasks => this.allTasks = tasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }

  /**
   * Handle marking task as done
   * @param task - Task to mark as done
   */
  async onToggleTask(task: Task): Promise<void> {
    try {
      const updatedTask = { ...task, state: 'Done' as const };
      await this.taskService.updateTask(updatedTask);
      console.log('Task marked as done');
      // Refresh tasks after update
      this.taskService.getAllTasks().subscribe(tasks => this.allTasks = tasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
}

// Made with Bob
