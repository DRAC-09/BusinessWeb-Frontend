import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
      providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

    constructor(
      private authService: AuthService
    ) {}

    intercept(req, next) {                                                          // Función para añadir una cabecera en cada peticion
          const tokenizeReq = req.clone({                                            // Se clona la petición
               setHeaders: {                                                         // Se establece el header que queramos          
                    Authorization: `Bearer ${this.authService.getToken()}`     // Añadimos el token al header
          }
          })
          return next.handle(tokenizeReq);
    }

}
