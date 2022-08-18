import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';              // Importar servicio http para hacer peticiones al servidor
import { Router } from '@angular/router';                       // Importar servicio router para redireccionar a otras páginas

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:9999';                        // URL del servidor

  constructor(
    private http: HttpClient,                                   // Instanciamos la clase HttpClient para poder usarla
    private router: Router                                      // Instanciamos la clase Router para poder usarla
  ){}


    register (user:any, ruta:String){                           // Función para el registro         
      return this.http.post(this.URL + ruta, user);             // Se retorna el resultado de la petición al servidor
    }

    login(user:any, ruta:String) {                              // Función para el login
      return this.http.post(this.URL + ruta, user);             // Se retorna el resultado de la petición al servidor
    }

    loggedIn() {                                                // Función para saber si el usuario está logueado    
      if (localStorage.getItem('token')) {                      // Si hay un token en el localStorage
        return true;                                            // Se retorna true
      }else{                                                    // Si no hay un token en el localStorage
        return false;                                           // Se retorna false
      }
    }

    cerrarSesion() {                                            // Función para cerrar sesión
      // localStorage.removeItem('token');                         // Se elimina el token del localStorage
      // localStorage.removeItem('user');                         // Se elimina el token del localStorage
      this.router.navigate(['/home']);                          // Se redirecciona a la ruta /login
      localStorage.clear();                                     // Se limpia el localStorage
      
    }



    
    
    getToken() {                                                    // Función para obtener el token
      return localStorage.getItem('token');                         // Se retorna el token del localStorage
    } 
    
    save (data:any, ruta:String){                           // Función para el registro         
      return this.http.post(this.URL + ruta, data);             // Se retorna el resultado de la petición al servidor
    }
    
    
    update (ruta:String, user:any){                                   // Actualiza Registros
      return this.http.put(this.URL + ruta, user);                    // retorna el resultado de la petición al servidor
    }

    getOne (ruta:String){                                             // Función para obtener un registro por medio del id         
      return this.http.get(this.URL + ruta);                          // retorna el resultado de la petición al servidor
    }

    getAll (ruta:String){                                             // Obtener todos los registos.        
      return this.http.get(this.URL + ruta);                          // retorna el resultado de la petición al servidor
    }

    delete (ruta:String){                                             // Obtener todos los registos.
      return this.http.delete(this.URL + ruta);                       // retorna el resultado de la petición al servidor
    }
}
