import { Component } from '@angular/core';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  faSquarePlus = faSquarePlus
}
