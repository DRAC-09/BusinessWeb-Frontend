import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms'; 
import { AuthService } from '../../../services/auth.service'                         


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

empresas: any = [];                                                   // guardar empresas obtenidas de la consulta a la base de datos 
admins: any = [];                                                     // guardar los administradores obtenidas de la consulta a la base de datos  


constructor(
  private authService: AuthService,                                   // servicio de autenticacion
  ) {}
  
  
  ngOnInit(): void {
    this.obtenerEmpresas();                                           // cargamos las empresas
  }
  

  
  obtenerEmpresas(){
    let ruta = `/empresas`;
    this.authService.getAll(ruta)
    .subscribe(res => {
      this.empresas = JSON.parse(JSON.stringify(res));
    }), err => {
      console.log(err);
    }
  }

  // Eliminar empresa
  eliminar(id){                                                                                                        
    let ruta = `/empresas/${id}`;
    this.authService.delete(ruta)
    .subscribe(res => {
      this.obtenerEmpresas();
    }), err => {
      console.log(err);
    }                               
  }

  
}


