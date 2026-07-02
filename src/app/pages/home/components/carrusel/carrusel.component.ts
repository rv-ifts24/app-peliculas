import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../../../../model/pelicula';
import { DetalleService } from '../../../../services/detalle.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../../../../services/favoritos.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {

  @Input() peliculas: Pelicula[] = [];

  private cacheEstadoLista = new Map<number, Observable<boolean>>();

  constructor(private detalleService: DetalleService,
    private favoritosService: FavoritosService
  ) { }

  obtenerFondo(pelicula: Pelicula): string {
    return this.detalleService.obtenerUrlImagen(pelicula.backdrop_path, 'w1280');
  }

  resumenCorto(overview: string): string {
    if (!overview) return '';
    const palabras = overview.split(' ');
    if (palabras.length <= 150) return overview;
    return palabras.slice(0, 150).join(' ') + '...';
  }

  estaEnLista(pelicula: Pelicula): Observable<boolean> {
    if (!this.cacheEstadoLista.has(pelicula.id)) {
      this.cacheEstadoLista.set(pelicula.id, this.favoritosService.esFavorito(pelicula.id));
    }
    return this.cacheEstadoLista.get(pelicula.id)!;
  }

  toggleLista(pelicula: Pelicula): void {
    this.favoritosService.esFavorito(pelicula.id).pipe(take(1)).subscribe(estaEnLista => {
      if (estaEnLista) {
        this.favoritosService.eliminarFavoritoPorMovieId(pelicula.id).subscribe({
          next: () => console.log('Eliminada de favoritos:', pelicula.id),
          error: (err) => console.error('Error al eliminar:', err)
        });
      } else {
        this.favoritosService.agregarFavorito(pelicula).subscribe({
          next: () => console.log('Pelicula agregada a favoritos:', pelicula.id),
          error: (err) => console.error('Error al agregar a favoritos:', err)
        });
      }
    });
  }
}
