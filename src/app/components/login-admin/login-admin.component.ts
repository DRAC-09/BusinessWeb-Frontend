import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';                                           // Importar servicio router para redireccionar a otras páginas  
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';                      // Importar servicio http para hacer peticiones al servidor
import { InfoService } from '../../services/info.service'


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  // user = {                                                                    // Objeto para almacenar los datos del usuario           
  //   email: '',
  //   password: ''
  // };

  admin: any = [];
  admins: any = [];

  
  formularioLogin = new FormGroup({                                           // Se crea el formulario reactivo                                     
    email: new FormControl('', [Validators.required, Validators.email]),      // Se crea el control del correo con las validaciones
    password: new FormControl('', [Validators.required])                      // Se crea el control del password con las validaciones
  });



  constructor(
    private authService: AuthService,                                         // Se instancia el servicio authService
    private router: Router,
    private http: HttpClient,                                                 // Se instancia el servicio http
  ) {
    

  }

  ngOnInit(): void {
  }

  login() {
    // this.user.email = this.formularioLogin.value.email;                       // Se obtiene el correo del formulario
    // this.user.password = this.formularioLogin.value.password;                 // Se obtiene el password del formulario

    let ruta = '/admin/login-admin';                                     // Ruta para el login de la admin
    this.authService.login(this.formularioLogin.value, ruta).subscribe(                        // Se llama a la función login del servicio autenticar
      res => {
        this.admin.push(res['user']);                                       // actualizar la lista de admins   
        localStorage.setItem('token', res['token']);                          // Se guarda el token en el localStorage
        this.loading();
        console.log(this.admin,"admin");
      },                                                                      
      err => {                                                                // Si el login es incorrecto
        console.log(err);                                                     // Se imprime en consola el error
      }
    );
    // this.obtenerAdmins();
    // this.obtenerEmpresas();
  }



  loading() {                                                                  
    this.router.navigate(['/admin']);                                // redirecciona a la ruta admin-companies (CMS)
  }


  // obtenerAdmins(){
  //   let ruta = `/admin`;

  //   this.authService.all(ruta)
  //   .subscribe(res => {
  //     localStorage.setItem('admins', JSON.stringify(res)); 
  //   }), err => {
  //     console.log(err);
  //   }
  // }

  // obtenerEmpresas(){
  //   let ruta = `/empresas`;

  //   this.authService.all(ruta)
  //   .subscribe(res => {
  //     // console.log('res',res);
  //     localStorage.setItem('empresas', JSON.stringify(res));
  //   }), err => {
  //     console.log(err);
  //   }
  // }

}
