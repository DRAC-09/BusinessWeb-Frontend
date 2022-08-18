import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgService } from 'src/app/services/img.service';
import { AuthService } from '../../../services/auth.service'                         // Importar servicio auth para acceder a (login, registro, etc)



@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  @ViewChild('gallery') gal!: ElementRef;

  // Variables
  images:any=[];                        // guardar imagen almacenada en ImgService (base64)
  previsualizacionLogo!: string;        // guarda una previsualizacion del Logo

  png: any = [];                        // guarda la imagen png del logo
  image: string;                         // guardar imagen almacenada en ImgService (base64)
  
  id!:string;
  img!:string;
  gallery:any=[];



  // formualrio para la imagen  
  formularioImagen = new FormGroup({                                                                                                         
    img:  new FormControl(''),
  });



  constructor(
    private authService: AuthService,                                         // Se instancia el servicio authService
    private sanitizer: DomSanitizer,
    private imgService: ImgService,

  ) {
    this.id = (String(localStorage.getItem('_id')));
    this.image = imgService.img;
    
    // this.imprimirGallery();
  }

  ngOnInit(): void {
    this.imprimirGallery();
  }



  // CAPTURAS DE IMAGENES ============================================================

  capturarLogo(event:any) {
    const logoCapturado = event.target.files[0]
    this.extraerBase64(logoCapturado).then((imagen: any) => {
      this.previsualizacionLogo = imagen.base;
      this.formularioImagen.get('img')?.setValue(imagen.base);
      // console.log(this.formularioImagen.value);
    })
    this.png.push(logoCapturado);
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
  guardar (){
    let ruta = `/empresas/${this.id}/gallery`;
    // console.log(ruta);

    this.authService.update(ruta, this.formularioImagen.value)
    .subscribe(res => {
      console.log(res);
    }), err => {
      console.log(err);
    }
    this.previsualizacionLogo = this.image;
    this.imprimirGallery();
    window.location.reload()
    // console.log('formulario', this.formularioImagen.value);
    // console.log('galerya variable', this.gallery);
  }

  imprimirGallery(){
    let ruta = `/empresas/${this.id}/gallery`;
    this.authService.getAll(ruta)
    .subscribe(res => {
      // console.log('res',res);
      this.gallery.push(res['gallery']); 
      // console.log("gallery",this.gallery);

      // let gf = {};
      // console.log("gf",gf);
    }), err => {
      console.log(err);
    }

    
  }


  obtenerGalerya(){

  }

  // eliminar imagen del arreglo de imagenes
  eliminarImagen(img:string){

  }


}

// Guardar imagen en el servidor ============================================================
