import { Component, OnInit, Input } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';     // usar formularios y validaciones
import { DomSanitizer } from '@angular/platform-browser';                         // para sanitizar html
import { ImgService } from 'src/app/services/img.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
    //Variables
    image: string;                        // guardar imagen almacenada en ImgService (base64)
    previsualizacionLogo!: string;        // guarda una previsualizacion del Logo
    previsualizacionFavicon!: string;     // guarda una previsualizacion del favicon
    
    editando: boolean = true;             // habilita/deshabilitar boton editar
    guardando: boolean = false;           // habilita/deshabilitar boton guardar
    identificador:any;                    // almacena id para usarlo en el boton actualizar de la ventana modal
    
    png: any = [];                        // guarda la imagen png del logo
    ico: any = [];                        // guarda la imagen ico del favicon
    empresas:any =[];

    // formualrio para empresa  
    formularioEmpresa = new FormGroup({                                                                                                         
      correo: new FormControl('', [Validators.required]),      
      nombre: new FormControl('', [Validators.required]),                      
      titulo: new FormControl('', [Validators.required]),                      
      descripcion: new FormControl('', [Validators.required]),                      
      logo: new FormControl('', [Validators.required]),                      
      favicon: new FormControl('', [Validators.required])                      
    });

    // backendHost:String = 'http://localhost:9999';

  constructor(
    private sanitizer: DomSanitizer,
    private imgService: ImgService
  ){
    this.image = imgService.img;
  }

  ngOnInit(): void {
    // this.http.get(`${this.backendHost}/empresas`)                       // conexion con el servidor
    //   .subscribe(res => {                                               // respuesta del servidor
    //       this.empresas = res;                                          // añadir al arreglo la respuesta de la peticion get (mostrar empresas)                                  
    // });
    this.formularioEmpresa.disable();
  }




  actualizar(){
    this.editando = true;                                                                 
    this.guardando = false;
    this.formularioEmpresa.disable();
    console.log(this.empresas);
  }

  editar(){
    this.editando = false;                                                                 
    this.guardando = true;
    this.formularioEmpresa.enable();
  } 

















  // CAPTURAS DE IMAGENES ============================================================

  capturarLogo(event:any) {
    const logoCapturado = event.target.files[0]
    this.extraerBase64(logoCapturado).then((imagen: any) => {
      this.previsualizacionLogo = imagen.base;
      this.empresas.logo = imagen.base;
      // console.log(imagen.base);

    })
    this.png.push(logoCapturado);
  }

  capturarFavicon(event:any) {
    const faviconCapturado = event.target.files[0]
    this.extraerBase64(faviconCapturado).then((imagen: any) => {
      this.previsualizacionFavicon = imagen.base;
      this.empresas.favicon = imagen.base;
      // console.log(imagen.base);

    })
    this.ico.push(faviconCapturado);
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


//  GETS del formulario ==============================================================

  get correo(){                                                      
    return this.formularioEmpresa.get('correo');
  }

  get nombre(){
    return this.formularioEmpresa.get('nombre');
  }

  get titulo(){
    return this.formularioEmpresa.get('titulo');
  }

  get descripcion(){
    return this.formularioEmpresa.get('descripcion');
  }

  get logo(){
    return this.formularioEmpresa.get('logo');
  }

  get favicon(){
    return this.formularioEmpresa.get('favicon');
  }
}
