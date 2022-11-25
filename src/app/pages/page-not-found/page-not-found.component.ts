import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  title: string;
  explanation: string;
  goHome: string;

  constructor(private router: Router) {
    this.title = 'Página no encontrada';
    this.explanation = 'La página que estaba buscando no existe'
    this.goHome = 'Ir a página de inicio'; 
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('/heroes');
  }
}
