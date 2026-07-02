import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../model/pelicula'
import { DetalleService } from '../../services/detalle.service'
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CommonModule } from '@angular/common';
import { TarjetaPeliculaComponent } from '../../shared/components/tarjeta-pelicula/tarjeta-pelicula.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CarruselComponent,
    TarjetaPeliculaComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  peliculasPopulares$!: Observable<Pelicula[]>;
  peliculasMasVotadas$!: Observable<Pelicula[]>;

  constructor(private detalleService: DetalleService) { }

  ngOnInit(): void {
    this.peliculasPopulares$ = this.detalleService.obtenerPeliculasPopulares().pipe(
      map(respuesta => respuesta.results)
    );

    this.peliculasMasVotadas$ = this.detalleService.obtenerPeliculasMasVotadas().pipe(
      map(respuesta => respuesta.results)
    );
  }

  trackPorId(index: number, pelicula: Pelicula): number {
    return pelicula.id;
  }

}
