import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-created-users',
  templateUrl: './created-users.component.html',
  styleUrls: ['./created-users.component.scss']
})
export class CreatedUsersComponent {
  @Input() userId:number|undefined

}
