import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input() task!: Task;

  @Output() delete = new EventEmitter<string>();

  @Output() toggle = new EventEmitter<Task>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onToggle(): void {
    this.toggle.emit(this.task);
  }

  getPriorityClass(): string {
    switch (this.task.priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }

  isDone(): boolean {
    return this.task.state === 'Done';
  }
}

