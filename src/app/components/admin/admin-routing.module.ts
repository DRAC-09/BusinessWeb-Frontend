import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando Componentes
import { AdminComponent } from './admin.component';
import { BusinessComponent } from './business/business.component';
import { PlansComponent } from './plans/plans.component';
import { TemesComponent } from './temes/temes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: BusinessComponent},
    {path: 'business', component: BusinessComponent},
    {path: 'plans', component: PlansComponent},
    {path: 'temes', component: TemesComponent},
    {path: 'users', component: UsersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
