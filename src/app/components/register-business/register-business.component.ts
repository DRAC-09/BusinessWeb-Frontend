import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';     // usar formularios y validaciones
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css']
})
export class RegisterBusinessComponent implements OnInit {

  plan!: String;
  empresaR: any = [];
  empresa = {
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

  formularioRegister = new FormGroup({                                                                                                         
    email: new FormControl('', [Validators.required, Validators.email]),      
    password: new FormControl('', [Validators.required]),                      
    name: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required])                      
  });

  // conexion con el servidor
  backendHost:String = 'http://localhost:9999'; 

  constructor(
    private authService: AuthService,
    private http: HttpClient

  ){}

  ngOnInit(): void {
  }

  plans(selection: String){
    this.empresa.email = this.formularioRegister.value.email;
    this.empresa.password = this.formularioRegister.value.password;
    this.empresa.info.name = this.formularioRegister.value.name;

    this.plan = selection;
    this.empresa.plan.name = String(this.plan);
  }


  registrarEmpresa(){
    let ruta = '/empresas/register-empresa';
    this.authService.register(this.empresa, ruta)
    .subscribe((res:any)=>{                                                               // respuesta del servidor
        console.log(res);                                                                   // mostrar en consola la respuesta del servidor
        this.empresaR.push(res);                                                            // actualizar la lista de empresas   
      });
      this.formularioRegister.reset();                                                     // resetear el formulario
    }

  // OTRA FORMA DE HACERLO
  // registrarEmpresa() {
  //   this.http.post(`${this.backendHost}/empresas/register-empresa`, this.empresa)          // Peticion post al servidor
  //     .subscribe((res:any)=>{                                                               // respuesta del servidor
  //       console.log(res);                                                                   // mostrar en consola la respuesta del servidor
  //       this.empresaR.push(res);                                                            // actualizar la lista de empresas   
  //       });
  //       // this.formularioRegister.reset(); 
  //       // console.log(this.empresa);
  //       // console.log(this.empresaR);
  // }

}
