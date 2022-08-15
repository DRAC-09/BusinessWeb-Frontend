import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';              // Importar servicio http para conexion con el servidor

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:9999';               // URL del servidor

  constructor(
    private http: HttpClient                                    // Instanciamos la clase HttpClient para poder usarla
  ){}


    register (user:any, ruta:String){
      return this.http.post(this.URL + ruta, user);
    }

}
