import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../../types';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.css'
})
export class AllTasks implements OnInit {
  taskService = inject(TaskService);

  tasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: () => {}
    });
  }

  async onDeleteTask(taskId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this task?')) {
      await this.taskService.deleteTask(taskId);
      this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    }
  }

  async onToggleTask(task: Task): Promise<void> {
    const updatedTask = { ...task, state: task.state === 'Done' ? 'NotDone' : 'Done' } as Task;
    await this.taskService.updateTask(updatedTask);
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }
}

