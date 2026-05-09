import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../Components/header/header';
import { Footer } from '../../Components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
}
