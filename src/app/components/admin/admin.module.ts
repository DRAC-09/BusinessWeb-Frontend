import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { InfoComponent } from './info/info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { PagesComponent } from './pages/pages.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ProductsComponent } from './products/products.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';
import { OthersComponent } from './others/others.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    InfoComponent,
    NavbarComponent,
    BodyComponent,
    PagesComponent,
    BlocksComponent,
    ProductsComponent,
    ImagesComponent,
    VideosComponent,
    OthersComponent,
    HomeAdminComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
