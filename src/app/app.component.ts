import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SistemaPresupuestoMercadeo';
  anio: any;
  ngOnInit() {
  
    this.anio= new Date().getFullYear()
  }
}
