import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroInfluencersComponent } from './components/registro-influencers/registro-influencers.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegisterComponent } from './components/register/register.component';
import { ListPresupuestosComponent } from './components/list-presupuestos/list-presupuestos.component';
import { RadiosregistrosComponent } from './components/Radios/radiosregistros/radiosregistros.component';

const routes: Routes = [


  { path: 'inicio', component: InicioComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'RegistroInfluencers', component: RegistroInfluencersComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'ListaPresupuestos', component: ListPresupuestosComponent },
  { path: 'RegistrosRadios', component: RadiosregistrosComponent },
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
