import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';                // Formularios reactivos
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';        //Hacer peticiones http
// import { AutenticarGuard } from './autenticar.guard';                             // Guard para proteger rutas
// import { TokenInterceptorService } from './services/token-interceptor-service';   // Interceptor para token


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginBusinessComponent } from './components/login-business/login-business.component';
import { RegisterBusinessComponent } from './components/register-business/register-business.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginBusinessComponent,
    RegisterBusinessComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
