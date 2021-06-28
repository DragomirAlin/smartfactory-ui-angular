import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/guard/auth.guard';
import {DatasetComponent} from './dataset/dataset.component';
import {AppComponent} from './app.component';
import {NotificationComponent} from './notification/notification.component';
import {IntegrationComponent} from './integration/integration.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dataset',
        component: DatasetComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'integration',
        component: IntegrationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
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
