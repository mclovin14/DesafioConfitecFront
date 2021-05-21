import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './users/form/user-form.component';
import { UserListComponent } from './users/list/user-list.component';

const routes: Routes = [
  {path: 'inserir', component: UserFormComponent},
  {path: 'listar', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
