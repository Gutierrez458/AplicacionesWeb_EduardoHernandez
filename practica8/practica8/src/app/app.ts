import { Component } from '@angular/core';
import { Eventos } from './tabla/tabla';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Eventos],
  template: `<app-eventos></app-eventos>`
})
export class App {}