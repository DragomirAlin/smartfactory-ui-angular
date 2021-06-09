import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from './auth/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
