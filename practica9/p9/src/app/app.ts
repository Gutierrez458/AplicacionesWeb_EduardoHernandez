import { Component } from '@angular/core';
import { Tabla } from './componentes/tabla/tabla';
import { Formulario } from './componentes/formulario/formulario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Tabla, Formulario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}