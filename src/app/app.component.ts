import { Component } from '@angular/core';
import { FriendServiceService } from './Services/friend-service.service';
import { Friend } from './models/friend';
import { Observable } from 'rxjs';
import { FriendResult } from './models/friendDistance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoriWeb';
  $friends: Observable<Friend[]>;
  friendList: FriendResult[];

 
    icon =  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  zoom: number = 10;

  constructor(
    private friendServiceService: FriendServiceService
  ) { }

  ngOnInit() {

    this.$friends = this.friendServiceService.retrieveFriends();
  }

  changeFriend($event) {

    if ($event) {
      this.friendServiceService.retrieveFriend($event.id).subscribe(
        friend => {

          this.friendList = friend;
          console.log(friend);
        }

      );
    }

  }


}





