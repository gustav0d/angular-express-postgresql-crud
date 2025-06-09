import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class App {
  protected title = 'frontend';
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
