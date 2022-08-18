import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';       // Importar FormControl, FormGroup, NgModel y Validators para usar en el formulario
import { AuthService } from '../../services/auth.service';                          // Importar servicio auth para acceder a (login, registro, etc)
import { HttpClient, HttpHeaders} from '@angular/common/http';                      // Importar servicio http para hacer peticiones al servidor
import { Router } from '@angular/router';                                           // Importar servicio router para redireccionar a otras páginas  
import { InfoService } from '../../services/info.service'

@Component({
  selector: 'app-login-business',
  templateUrl: './login-business.component.html',
  styleUrls: ['./login-business.component.css']
})
export class LoginBusinessComponent implements OnInit {

  user = {                                                                    // Objeto para almacenar los datos del usuario           
    email: '',
    password: ''
  };

  empresa: any = [];

  formularioLogin = new FormGroup({                                           // Se crea el formulario reactivo                                     
    email: new FormControl('', [Validators.required, Validators.email]),      // Se crea el control del correo con las validaciones
    password: new FormControl('', [Validators.required])                      // Se crea el control del password con las validaciones
  });

  constructor(
    private authService: AuthService,                                         // Se instancia el servicio authService
    private http: HttpClient,                                                 // Se instancia el servicio http
    private router: Router,
    private infoService: InfoService                                                   // Se instancia el servicio router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.user.email = this.formularioLogin.value.email;                       // Se obtiene el correo del formulario
    this.user.password = this.formularioLogin.value.password;                 // Se obtiene el password del formulario

    let ruta = '/empresas/login-empresa';                                     // Ruta para el login de la empresa
    this.authService.login(this.user, ruta).subscribe(                        // Se llama a la función login del servicio autenticar
      res => {
        this.empresa.push(res['user']);                                       // actualizar la lista de empresas   
        localStorage.setItem('token', res['token']);                          // Se guarda el token en el localStorage
        localStorage.setItem('user1', res['user']);
        localStorage.setItem('_id', res['user']._id);
        localStorage.setItem('user', JSON.stringify(res['user']));
        this.loading();
      },                                                                      
      err => {                                                                // Si el login es incorrecto
        console.log(err);                                                     // Se imprime en consola el error
      }
    );
  }


  loading() {                                                                  
    this.router.navigate(['/admin-companies']);                                // redirecciona a la ruta admin-companies (CMS)
  }

    


}
