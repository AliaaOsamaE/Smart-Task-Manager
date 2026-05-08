import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * TaskList Component - Container for task filtering tabs
 * 
 * This component:
 * - Displays navigation tabs for filtering tasks (All, Done, Not Done)
 * - Uses RouterOutlet to display the selected filter component
 * - Highlights the active tab
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  // This component acts as a container for the task filter tabs
}

// Made with Bob
