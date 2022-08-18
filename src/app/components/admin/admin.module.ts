import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// importanto componentes
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BodyComponent } from './body/body.component';
import { BusinessComponent } from './business/business.component';
import { PlansComponent } from './plans/plans.component';
import { TemesComponent } from './temes/temes.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AdminComponent,
    BodyComponent,
    BusinessComponent,
    PlansComponent,
    TemesComponent,
    UsersComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
