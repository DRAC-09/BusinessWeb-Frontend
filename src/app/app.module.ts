import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';                // Formularios reactivos
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';        //Hacer peticiones http
import { TokenInterceptorService } from './services/token-interceptor.service';   // Interceptor para token
import { AutenticarGuard } from './autenticar.guard';                                            // Guard para proteger rutas



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginBusinessComponent } from './components/login-business/login-business.component';
import { RegisterBusinessComponent } from './components/register-business/register-business.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginBusinessComponent,
    RegisterBusinessComponent,
    LoginAdminComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AutenticarGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
