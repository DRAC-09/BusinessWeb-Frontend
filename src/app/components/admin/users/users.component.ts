import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  empresas: any = [];
  admins: any = [];

  // formularioEmpresa = new FormGroup({
  //   email: new FormControl('' ),
  //   categoria: new FormControl('' ),
  //   logo: new FormControl(''),
  // });

  constructor(
    private authService: AuthService,
  ) {
    // this.admins = JSON.parse(String(localStorage.getItem('admins')));
    // this.empresas = JSON.parse(String(localStorage.getItem('empresas')));
  }

  ngOnInit(): void {
    this.obtenerEmpresas();
    this.obtenerAdmins();
  }

  deleteEmpresa(id){    
    let ruta = `/empresas/${id}`;
    console.log(id);

    this.authService.delete(ruta)
    .subscribe(res => {
      // console.log('res',res);
      this.obtenerEmpresas();
    }), err => {
      console.log(err);
    }                                                                                                                          
  }

  deleteAdmin(id){    
    let ruta = `/admin/${id}`;
    // console.log(ruta);

    this.authService.delete(ruta)
    .subscribe(res => {
      // console.log('res',res);
      this.obtenerAdmins();
    }), err => {
      console.log(err);
    }                                                                                                                          
  }


  obtenerEmpresas(){
    let ruta = `/empresas`;

    this.authService.getAll(ruta)
    .subscribe(res => {
      // console.log('res',res);
      // localStorage.setItem('empresas', JSON.stringify(res));
      // this.admins = JSON.parse(String(localStorage.getItem('admins')));
      this.empresas = JSON.parse(JSON.stringify(res));
      // console.log('admins',this.empresas);
    }), err => {
      console.log(err);
    }
  }

  obtenerAdmins(){
    let ruta = `/admin`;

    this.authService.getAll(ruta)
    .subscribe(res => {
      this.admins = JSON.parse(JSON.stringify(res));
    }), err => {
      console.log(err);
    }
  }
}
