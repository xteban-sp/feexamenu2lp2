import { Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente';
import { SancionComponent } from './components/sancion/sancion';
import { Home } from './components/home/home';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'clientes',component:ClienteComponent},
    {path:'sanciones',component:SancionComponent},
    {path:'**',redirectTo:''}
];
