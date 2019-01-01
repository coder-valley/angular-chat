import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './../../socket.service';
import { AppService } from './../../app.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [SocketService]
})

export class ChatBoxComponent implements OnInit {


  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;


  constructor( public AppService: AppService, public SocketService: SocketService, public router: Router, private toastr: ToastrService, public cookieService: CookieService ) 
  {
    this.receiverId = this.cookieService.get('receiverId');
    this.receiverName = this.cookieService.get('receiverName');
  }

  ngOnInit() {

    this.authToken = this.cookieService.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalstorage();

    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList()



  }

  public checkStatus: any = () => {

    if (this.cookieService.get('authtoken') === undefined || this.cookieService.get('authtoken') === '' || this.cookieService.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus



  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()

      });
    }
  
  public getOnlineUserList :any =()=>{

    this.SocketService.onlineUserList()
      .subscribe((userList) => {

        this.userList = [];

        for (let x in userList) {

          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };

          this.userList.push(temp);          

        }
        
        // console.log(this.userList);

      }); // end online-user-list
  }
}
