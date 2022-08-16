import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  empresa: string = '';

  constructor() { 
  }

  setEmpresa(info){
    this.empresa = info;
  }

  getEmpresa(){
    return this.empresa;
  }
}
