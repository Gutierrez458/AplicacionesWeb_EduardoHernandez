import { Component, OnInit } from '@angular/core';
import { Game } from '../../services/game'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  games: any[] = [];
  nuevo: any = { nombre: '', genero: '', precio: 0, imagenUrl: '' };
  mostrarModalEliminar = false;
  juegoAEliminar: any = null;
  
  // Nueva variable para la notificación
  mensajeExito: string = '';

  constructor(private gameService: Game) {}

  ngOnInit(): void {
    this.cargarGames();
  }

  cargarGames() {
    this.gameService.getGames().subscribe({
      next: (data) => { this.games = data; },
      error: (e) => console.error("Error al cargar:", e)
    });
  }

  guardar() {
    // Guardamos el nombre temporalmente para el mensaje
    const nombreJuego = this.nuevo.nombre;

    this.gameService.addGame(this.nuevo).subscribe({
      next: () => {
        // Activamos el mensaje de éxito
        this.mensajeExito = `¡Éxito! "${nombreJuego}" se ha añadido a la tienda.`;
        
        this.cargarGames();
        this.nuevo = { nombre: '', genero: '', precio: 0, imagenUrl: '' };

        // Desaparece después de 3 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);
      },
      error: (e) => {
        console.error("Error al guardar:", e);
        alert("Hubo un error al guardar el juego.");
      }
    });
  }

  abrirModalEliminar(juego: any) {
    this.juegoAEliminar = juego;
    this.mostrarModalEliminar = true;
  }

  cerrarModal() {
    this.mostrarModalEliminar = false;
    this.juegoAEliminar = null;
  }

  confirmarEliminar() {
    if (this.juegoAEliminar && this.juegoAEliminar._id) {
      this.gameService.deleteGame(this.juegoAEliminar._id).subscribe({
        next: () => {
          this.cargarGames();
          this.cerrarModal();
        },
        error: (e) => console.error("Error al eliminar:", e)
      });
    }
  }
}