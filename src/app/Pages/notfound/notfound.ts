import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css'
})
export class NotFound {
  // 404 Not Found page component
}

// Made with Bob
