import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-input',
  imports: [FormsModule],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css',
})
export class TaskInput {
  title = '';
  description = '';
  priority = 'Low';
  date = '';

  tasks: any[] = [];

  addTask() {
    const task = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      date: this.date,
    };

    this.tasks.push(task);

    console.log(this.tasks);
  }
}