import { Component, signal } from '@angular/core';
// RouterOutlet is not needed until you add routing views to the template
// import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { HomeComponent }   from './components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Navbar,
    Footer,
    HomeComponent,
    // RouterOutlet            // uncomment when you add <router-outlet> to app.html
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // note the plural property name
})
export class App {
  protected readonly title = signal('Practica10');
}