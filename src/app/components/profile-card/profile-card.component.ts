import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent  implements OnInit {
  @Input() profileImageUrl!: string;
  @Input() userName!: string;
  @Input() phoneNumber!: string;
  constructor() { }

  ngOnInit() {}

}
