import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Navbar, Footer],
  template: `
    <app-header></app-header>
    <app-navbar></app-navbar>

    <main class="container my-4">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `
})
export class App {}
