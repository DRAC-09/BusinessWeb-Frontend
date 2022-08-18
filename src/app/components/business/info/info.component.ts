import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';     // usar formularios y validaciones
import { DomSanitizer } from '@angular/platform-browser';                         // para sanitizar html
import { ImgService } from 'src/app/services/img.service';
import { AuthService } from '../../../services/auth.service'                         // Importar servicio auth para acceder a (login, registro, etc)



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
    //Variables
    image: string;                        // guardar imagen almacenada en ImgService (base64)
    plan!: string;                        // guardar tipo de plan seleccionado
    previsualizacionLogo!: string;        // guarda una previsualizacion del Logo
    previsualizacionFavicon!: string;     // guarda una previsualizacion del favicon
    
    editando: boolean = true;             // habilita/deshabilitar boton editar
    guardando: boolean = false;           // habilita/deshabilitar boton guardar
    
    png: any = [];                        // guarda la imagen png del logo
    ico: any = [];                        // guarda la imagen ico del favicon
    empresa:any =[];


    // formualrio para empresa  
    formularioEmpresa = new FormGroup({                                                                                                         
      email:  new FormControl(''),
      plan : new FormControl(''), 
          info : new FormGroup ({
              name:         new FormControl(''),                      
              tittle:       new FormControl(''),                      
              description:  new FormControl(''),                      
              logo:         new FormControl(''),                      
              favicon:      new FormControl('')                      
          }),
    });

    // backendHost:String = 'http://localhost:9999';

  constructor(
    private authService: AuthService,                                         // Se instancia el servicio authService
    private sanitizer: DomSanitizer,
    private imgService: ImgService,
  ){
    this.empresa = JSON.parse(String(localStorage.getItem('user')));

    this.formularioEmpresa.get('email')?.setValue(this.empresa.email);
    this.formularioEmpresa.get('info')?.get('name')?.setValue(this.empresa.info[0].name);
    this.formularioEmpresa.get('Plan')?.get('name')?.setValue(this.empresa.plan[0].name);
    this.formularioEmpresa.get('info')?.get('tittle')?.setValue(this.empresa.info[0].tittle);
    this.formularioEmpresa.get('info')?.get('description')?.setValue(this.empresa.info[0].description);
    this.formularioEmpresa.get('info')?.get('logo')?.setValue(this.empresa.info[0].logo);
    this.formularioEmpresa.get('info')?.get('favicon')?.setValue(this.empresa.info[0].favicon);
    this.plan = this.empresa.plan;
    this.previsualizacionFavicon = this.empresa.info[0].favicon;
    this.previsualizacionLogo = this.empresa.info[0].logo;
    this.image = imgService.img;
    this.formularioEmpresa.disable();
    // console.log(this.empresa);

  }

  ngOnInit(): void {
    this.formularioEmpresa.disable();
  }

  // CAPTURAS DE IMAGENES ============================================================

  capturarLogo(event:any) {
    const logoCapturado = event.target.files[0]
    this.extraerBase64(logoCapturado).then((imagen: any) => {
      this.previsualizacionLogo = imagen.base;
      this.empresa.logo = imagen.base;
      this.formularioEmpresa.get('info')?.get('logo')?.setValue(imagen.base);
    })
    this.png.push(logoCapturado);
  }

  capturarFavicon(event:any) {
    const faviconCapturado = event.target.files[0]
    this.extraerBase64(faviconCapturado).then((imagen: any) => {
      this.previsualizacionFavicon = imagen.base;
      this.empresa.favicon = imagen.base;
      this.formularioEmpresa.get('info')?.get('favicon')?.setValue(imagen.base);
    })
    this.ico.push(faviconCapturado);
      // console.log(imagen.base);
    }

  // convierte la imagen a base64 para poder enviarla al servidor y previsualizarla
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
    return null;
  })





  // ========================================================================================
  

  actualizar(){
    this.editando = true;                                                                 
    this.guardando = false;
    
    this.formularioEmpresa.get('plan')?.setValue(this.plan);
    let ruta = `/empresas/${this.empresa._id}`;
    console.log(ruta);
    
    localStorage.setItem('empresa1', this.formularioEmpresa.value);
    localStorage.setItem('empresa2', JSON.stringify(this.formularioEmpresa.value));
    console.log(this.formularioEmpresa.value);
    
    this.authService.update(ruta, this.formularioEmpresa.value)
    .subscribe(res => {
      console.log(res);
    }), err => {
      console.log(err);
    }
    this.formularioEmpresa.disable();
  }


  editar(){
    this.editando = false;                                                                 
    this.guardando = true;
    this.formularioEmpresa.enable();
    // console.log(this.image);
  } 

















  

//  GETS del formulario ==============================================================

  // get correo(){                                                      
  //   return this.formularioEmpresa.get('correo');
  // }

  // get nombre(){
  //   return this.formularioEmpresa.get('nombre');
  // }

  // get titulo(){
  //   return this.formularioEmpresa.get('titulo');
  // }

  // get descripcion(){
  //   return this.formularioEmpresa.get('descripcion');
  // }

  // get logo(){
  //   return this.formularioEmpresa.get('logo');
  // }

  // get favicon(){
  //   return this.formularioEmpresa.get('favicon');
  // }


  // enable() {
  //   document.getElementById("logo")?.setAttribute('[disabled]', 'true');
  //   document.getElementById("favicon").disabled = false;
  // }


}
