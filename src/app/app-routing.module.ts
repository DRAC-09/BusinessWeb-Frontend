import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Rutas de Navegacion
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin-companies',loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
  
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
