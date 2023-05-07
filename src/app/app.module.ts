import { BrowserModule } from '@angular/platform-browser';
import { environment } from "../environments/environment";
import { AppComponent } from './app.component';
import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from '@angular/fire/compat';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import { NgModule } from '@angular/core';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    CrearTarjetaComponent,
    ListarTarjetaComponent,
    
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
