import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AutenticarGuard implements CanActivate {


  constructor(
    private authService: AuthService,                         // Servicio de autenticación
    private router: Router                                    // Importamos el servicio de autenticación y el router para redireccionar
  ){}



  canActivate(): boolean {                                    // Función para saber si el usuario está logueado     
    if (this.authService.loggedIn()) {                        // Si el token existe
      return true;                                            // retornara true y continuara con la ruta que queremos mostrar                 
    } 
    this.router.navigate(['/login-business']);                // Si no existe el token, se redireccionara a la ruta /login
    return false;                                             // retornara false y no continuara con la ruta que queremos mostrar
  }
  
}
