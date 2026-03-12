import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Games } from '../../services/alumnos';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tabla.html'
})
export class Tabla implements OnInit {
  listaGames: any[] = [];
  juegoAEliminar: string = ""; // Aquí guardamos el ID temporalmente

  constructor(
    private gamesService: Games,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarGames();
  }

  cargarGames() {
    this.gamesService.obtenerGames().subscribe({
      next: (data) => {
        this.listaGames = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error al cargar:", err)
    });
  }

  // Esta función es la que llama el botón "Sí, eliminar" del Modal
  eliminarGame(id: string) {
    if (!id) return;

    this.gamesService.eliminarGame(id).subscribe({
      next: () => {
        // 1. Recargar la lista de la pantalla principal
        this.cargarGames();
        // 2. Limpiar la variable
        this.juegoAEliminar = "";
        console.log("Eliminado con éxito");
      },
      error: (err) => {
        console.error("Error al eliminar:", err);
        alert("Hubo un error al eliminar el juego.");
      }
    });
  }

  editarGame(game: any) {
    this.router.navigate(['/editar', game._id]);
  }
}