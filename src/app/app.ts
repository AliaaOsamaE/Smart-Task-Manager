import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * App Component - Root component of the application
 * 
 * This component:
 * - Uses RouterOutlet to display routed components
 * - Acts as the main container for the entire application
 */
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Root component - routing handles all navigation
}

// Made with Bob
