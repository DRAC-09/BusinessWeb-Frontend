import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'  


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  editando: boolean = false;           // Habilita boton editar
  guardando: boolean = false;          // Habilita boton guardar
  identificador:any;                   // almacena id para usarlo en el boton actualizar de la ventana modal
  plans: any = [];


  // formualrio reactivo para empresa  
  formularioPlan = new FormGroup({                                                                                                         
    tipo: new FormControl(''),      
    pages: new FormControl(''),                      
    categories: new FormControl(''),                      
    blocks: new FormControl(''),                      
    products: new FormControl('')                    
  });

  constructor(
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.obtenerPlans();
  }

  edit(id){
    this.identificador = id;
    let ruta = `/plan/${id}`;


    this.authService.getOne(ruta)                                   // Peticion get al servidor
    .subscribe(res => {            
      this.plans = JSON.parse(JSON.stringify(res));
                                                       // respuesta del servidor
      this.formularioPlan.get('tipo')?.setValue(res['name']);                         // actualizar el formulario con la respuesta del servidor
      this.formularioPlan.get('pages')?.setValue(res['pages']);
      this.formularioPlan.get('categories')?.setValue(res['categories']);
      this.formularioPlan.get('blocks')?.setValue(res['blocks']);
      this.formularioPlan.get('products')?.setValue(res['products']);
      this.identificador = id;
    }), err => {
      console.log(err);// console.log(this.identificador);                                                 // mostrar en consola la respuesta del servidor
    }
  }

  updatePlan(){
    let ruta = `/plan/${this.identificador}`;
    console.log(ruta);
    console.log(this.formularioPlan.value);
    this.authService.update(ruta, this.formularioPlan.value)
    .subscribe(res => {
      console.log('res',res);
      this.obtenerPlans();
    }), err => {
      console.log(err);
    }
  }

  obtenerPlans(){
    let ruta = `/plan`;

    this.authService.getAll(ruta)
    .subscribe(res => {
      this.plans = JSON.parse(JSON.stringify(res));
    }), err => {
      console.log(err);
    }
  }


}
