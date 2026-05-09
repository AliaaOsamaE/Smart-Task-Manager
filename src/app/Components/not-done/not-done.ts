import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../types';

@Component({
  selector: 'app-not-done',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './not-done.html',
  styleUrl: './not-done.css'
})
export class NotDone implements OnInit {
  taskService = inject(TaskService);

  allTasks: Task[] = [];

  get tasks() {
    return this.allTasks.filter(task => task.state === 'NotDone');
  }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
      },
      error: () => {}
    });
  }

  async onDeleteTask(taskId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this task?')) {
      await this.taskService.deleteTask(taskId);
      this.taskService.getAllTasks().subscribe(tasks => this.allTasks = tasks);
    }
  }

  async onToggleTask(task: Task): Promise<void> {
    const updatedTask = { ...task, state: 'Done' as const };
    await this.taskService.updateTask(updatedTask);
    this.taskService.getAllTasks().subscribe(tasks => this.allTasks = tasks);
  }
}

