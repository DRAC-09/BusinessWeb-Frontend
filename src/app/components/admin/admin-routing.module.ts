import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { InfoComponent } from './info/info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesComponent } from './pages/pages.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ProductsComponent } from './products/products.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';
import { OthersComponent } from './others/others.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: InfoComponent},
    {path: 'info', component: InfoComponent},
    {path: 'pages', component: PagesComponent},
    {path: 'blocks', component: BlocksComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'images', component: ImagesComponent},
    {path: 'videos', component: VideosComponent},
    {path: 'others', component: OthersComponent},
    {path: 'home-admin', component: HomeAdminComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
