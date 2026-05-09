import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Task } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';
  getAllTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: string) {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  async addTask(task: Task) {
    await firstValueFrom(
      this.http.post(this.apiUrl, task)
    );
  }

  async updateTask(updatedTask: Task) {
    const id = updatedTask.id;
    await firstValueFrom(
      this.http.put(`${this.apiUrl}/${id}`, updatedTask)
    );
  }

  async deleteTask(id: string) {
    await firstValueFrom(
      this.http.delete(`${this.apiUrl}/${id}`)
    );
  }
}
