import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navegation.html',
  styleUrls: ['./navegation.scss'],
})
export class Navegation {

}
