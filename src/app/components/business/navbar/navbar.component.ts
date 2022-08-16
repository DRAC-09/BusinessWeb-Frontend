import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navData = navbarData;

  constructor(
    private authService: AuthService                            // Se instancia el servicio authService
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.authService.cerrarSesion();
  }

}
