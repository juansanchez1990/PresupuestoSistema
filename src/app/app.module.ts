import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroInfluencersComponent } from './components/registro-influencers/registro-influencers.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { ButtonModule } from 'primeng/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import { ListPresupuestosComponent } from './components/list-presupuestos/list-presupuestos.component';
import { AddInfluencerComponent } from './components/add-influencer/add-influencer.component';
import { RegistroPagoComponent } from './components/registro-pago/registro-pago.component';
import { RadiosregistrosComponent } from './components/Radios/radiosregistros/radiosregistros.component';
import { RegistrosPagosRadiosComponent } from './components/Radios/registros-pagos-radios/registros-pagos-radios.component';
import { AddRadioComponent } from './components/Radios/add-radio/add-radio.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistroInfluencersComponent,
    LoginComponent,
    InicioComponent,
    RegisterComponent,
    ListPresupuestosComponent,
    AddInfluencerComponent,
    RegistroPagoComponent,
    RadiosregistrosComponent,
    RegistrosPagosRadiosComponent,
    AddRadioComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    MatSidenavModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatTableExporterModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    ButtonModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    TableModule,
    HttpClientModule,
    MatSlideToggleModule,
    
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDWH6YaSfB4EsGFiISlNjtlUL4ZLMpQ17E",
      authDomain: "reportesmercadeo-5e125.firebaseapp.com",
      projectId: "reportesmercadeo-5e125",
      storageBucket: "reportesmercadeo-5e125.appspot.com",
      messagingSenderId: "140473460738",
      appId: "1:140473460738:web:8bae980e99481bb6b71f1b",
      measurementId: "G-RE6Z37FLF0"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
