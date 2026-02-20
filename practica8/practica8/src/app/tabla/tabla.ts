import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosService } from '../services/eventos';

@Component({
selector: 'app-eventos',
standalone: true,
imports: [CommonModule],
templateUrl: './tabla.html'
})
export class Eventos implements OnInit {

listaEventos: any[] = [];

constructor(private eventosService: EventosService) {}

ngOnInit(): void {
    this.eventosService.obtenerEventos()
    .subscribe((data: any[]) => {
        this.listaEventos = data;
        console.log(data);   // ← esto nos ayuda a verificar
    });
}
}