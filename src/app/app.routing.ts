import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {TicketsComponent} from './components/tickets/tickets.component';
import {LoginGuardCanActivate} from "./shared/guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {TicketComponent} from "./components/ticket/ticket.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Авторизация',
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    title: 'Мой профиль',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => LoginGuardCanActivate(route, state)],
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    title: 'Тикеты',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => LoginGuardCanActivate(route, state)],
  },
  {
    path: 'ticket/:ticketId',
    component: TicketComponent,
    title: 'Подробности',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => LoginGuardCanActivate(route, state)],
  },
  {
    path: '**',
    redirectTo: 'tickets',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
