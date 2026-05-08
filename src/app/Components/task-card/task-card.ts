import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';

/**
 * TaskCard Component - Displays a single task with actions
 * 
 * This component:
 * - Receives a task as input
 * - Displays task information (title, description, priority, date, category, status)
 * - Emits events for delete and toggle actions
 * - Shows different styling based on task status
 */
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  // Input: Task to display
  @Input() task!: Task;

  // Output: Event emitted when delete button is clicked
  @Output() delete = new EventEmitter<string>();

  // Output: Event emitted when toggle status button is clicked
  @Output() toggle = new EventEmitter<Task>();

  /**
   * Handle delete button click
   */
  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  /**
   * Handle toggle status button click
   */
  onToggle(): void {
    this.toggle.emit(this.task);
  }

  /**
   * Get priority badge class based on priority level
   */
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

  /**
   * Check if task is completed
   */
  isDone(): boolean {
    return this.task.state === 'Done';
  }
}

// Made with Bob
