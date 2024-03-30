import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { NotFoundComponent } from './Errors/components/not-found/not-found.component';
import { JsonPageComponent } from './Features/Json-to-Table/pages/json-page/json-page.component';
import { AuthGuard } from './Auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: JsonPageComponent,
    canActivate: [AuthGuard], // Protected route
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
