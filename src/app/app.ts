import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { Header } from './header/header';
import { Carousel } from './carousel/carousel';
import { TaskInput } from './task-input/task-input';
import { TaskList } from './task-list/task-list';
import { Footer } from './footer/footer';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Header, Carousel, TaskInput, TaskList, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('smart-task-manager');
}