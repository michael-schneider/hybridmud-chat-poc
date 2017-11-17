import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'chat', component: ChatComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
