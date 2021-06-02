import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GameComponent } from './game/game.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { LogoutComponent } from './logout/logout.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'game', component: GameComponent },
  { path: 'highscores', component: HighscoresComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
