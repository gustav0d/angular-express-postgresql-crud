import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class App {
  protected title = 'frontend';
}
