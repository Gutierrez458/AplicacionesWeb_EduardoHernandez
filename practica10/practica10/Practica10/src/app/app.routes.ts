import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AddComponent } from './components/add/add';
import { DeleteComponent } from './components/delete/delete';
import { UpdateFormComponent } from './pages/update-form/update-form';
import { DeleteListComponent } from './pages/delete-list/delete-list';
import { UpdateListComponent } from './pages/update-list/update-list';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add', component: AddComponent },
    { path: 'delete', component: DeleteListComponent },
    { path: 'delete/:id', component: DeleteComponent },
    { path: 'update', component: UpdateListComponent },
    {path: 'update/:id', component: UpdateFormComponent}
];
