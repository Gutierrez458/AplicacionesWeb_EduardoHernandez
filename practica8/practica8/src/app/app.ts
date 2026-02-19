import { Component } from '@angular/core';
import { Eventos } from './tabla/tabla';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Eventos],
  templateUrl: './app.html'
})
export class App {}
