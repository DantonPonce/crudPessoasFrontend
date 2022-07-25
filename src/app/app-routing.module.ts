import { FormularioPessoaComponent } from './components/home/formulario-pessoa/formulario-pessoa.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'cadastrar-pessoa',
    component: FormularioPessoaComponent,
  },
  {
    path: 'editar-pessoa',
    component: FormularioPessoaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
