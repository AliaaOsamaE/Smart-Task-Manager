import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../types';

/**
 * AllTasks Component - Displays all tasks regardless of status
 *
 * This component:
 * - Fetches all tasks from TaskService
 * - Displays them using TaskCard component
 * - Shows a message if no tasks exist
 */
@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks implements OnInit {
  // Inject TaskService
  taskService = inject(TaskService);

  // Store tasks locally
  tasks: Task[] = [];

  ngOnInit(): void {
    // Fetch tasks when component initializes using Observable
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('All tasks loaded successfully');
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
        this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }

  /**
   * Handle task status toggle
   * @param task - Task to toggle
   */
  async onToggleTask(task: Task): Promise<void> {
    try {
      const updatedTask = { ...task, state: task.state === 'Done' ? 'NotDone' : 'Done' } as Task;
      await this.taskService.updateTask(updatedTask);
      console.log(`Task marked as ${updatedTask.state}`);
      // Refresh tasks after update
      this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
}

// Made with Bob
