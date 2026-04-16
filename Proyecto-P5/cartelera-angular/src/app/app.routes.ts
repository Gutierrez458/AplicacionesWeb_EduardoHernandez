import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { List } from './pages/list/list';
export const routes: Routes = [{ 
    path: '', component: Home },
    { path: 'contacto', component: Contact },
    { path: 'listado', component: List }];
