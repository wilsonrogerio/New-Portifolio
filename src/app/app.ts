import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegation } from './components/navegation/navegation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navegation],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected title = 'wilson-portifolio';

}

