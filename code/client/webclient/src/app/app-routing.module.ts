import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { EnsureLoginService } from './shared/ensure-login.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'chat', component: ChatComponent, canActivate: [EnsureLoginService] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
