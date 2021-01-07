import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { TrucksComponent } from './trucklist/TrucksComponent.component';
import { MenusComponent } from './menus/menus.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trucks', component: TrucksComponent },
  { path: 'menus', component: MenusComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: PasswordResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
