import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';       // Importar FormControl, FormGroup, NgModel y Validators para usar en el formulario
import { AuthService } from 'src/app/services/auth.service';                        // Importar servicio auth para acceder a (login, registro, etc)
import { HttpClient, HttpHeaders} from '@angular/common/http';                      // Importar servicio http para hacer peticiones al servidor
import { Router } from '@angular/router';                                           // Importar servicio router para redireccionar a otras páginas  


@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css']
})
export class RegisterBusinessComponent implements OnInit {

  plan!: String;                                                                    // almacena el tipo de plan seleccionado
  empresaR: any = [];                                                               // almacena los datos del formulario de registro de empresa
  empresa = {                                                                       // Objeto para almacenar los datos del formulario
    email: '',
    password: '',
    plan: 
        {
            name: ''
        }
    ,
    info: 
        {
            name: ''
        }
  };

  formularioRegister = new FormGroup({                                            // Formulario para el registro de empresa                                                                                                       
    email: new FormControl('', [Validators.required, Validators.email]),      
    password: new FormControl('', [Validators.required]),                      
    name: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required])                      
  });


  constructor(
    private authService: AuthService,                                             // Se instancia el servicio authService
    private http: HttpClient,                                                     // Se instancia el servicio http
    private router: Router,                                                       // Se instancia el servicio router
  ){}

  ngOnInit(): void {
  }

  plans(selection: String){                                                       // Función para seleccionar el plan
    this.empresa.email = this.formularioRegister.value.email;                     // Se almacena el email del formulario en el objeto empresa
    this.empresa.password = this.formularioRegister.value.password;               // Se almacena la contraseña del formulario en el objeto empresa
    this.empresa.info.name = this.formularioRegister.value.name;                  // Se almacena el nombre del formulario en el objeto empresa

    this.plan = selection;                                                        // Se almacena el plan seleccionado en la variable plan
    this.empresa.plan.name = String(this.plan);                                   // Se almacena el plan seleccionado en el objeto empresa
  }


  registrarEmpresa(){                                                             // Función para registrar la empresa   
    let ruta = '/empresas/register-empresa';                                      // Ruta para registrar la empresa
    this.authService.register(this.empresa, ruta)                                 // Se llama a la función register del servicio authService y se le pasan los datos del formulario y la ruta
    .subscribe(
      res=>{                                                                      // respuesta del servidor
        localStorage.setItem('token', res['token']);                              // Se guarda el token en el localStorage
        this.router.navigate(['/login-business']);                                // Se redirecciona a la página de login de empresa  
      });
    this.formularioRegister.reset();                                              // Se resetea el formulario                   
    }

}
