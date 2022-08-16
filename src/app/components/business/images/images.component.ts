import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgService } from 'src/app/services/img.service';
                         


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  // Variables
  images:any=[];                        // guardar imagen almacenada en ImgService (base64)
  previsualizacionLogo!: string;        // guarda una previsualizacion del Logo
  previsualizacionFavicon!: string;     // guarda una previsualizacion del favicon
  empresa:any =[];
  png: any = [];                        // guarda la imagen png del logo
  image: string;                        // guardar imagen almacenada en ImgService (base64)





  constructor(
    private sanitizer: DomSanitizer,
    private imgService: ImgService,

  ) {
    this.images = JSON.parse(String(localStorage.getItem('user')));
    this.image = imgService.img;

  }

  ngOnInit(): void {
  }



  // CAPTURAS DE IMAGENES ============================================================

  capturarLogo(event:any) {
    const logoCapturado = event.target.files[0]
    this.extraerBase64(logoCapturado).then((imagen: any) => {
      this.previsualizacionLogo = imagen.base;
      this.empresa.logo = imagen.base;
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

}
