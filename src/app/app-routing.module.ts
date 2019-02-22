import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {AppGuardComponent} from './app-guard.component';
import { AlbumsComponent } from './albums/albums.component';


const routes: Routes = [
    { path: '', component: AlbumsComponent, pathMatch: 'full', canActivate: [AppGuardComponent] },
    { path: 'albums', component: AlbumsComponent, canActivate: [AppGuardComponent] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
