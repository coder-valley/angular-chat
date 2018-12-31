import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { catchError, tap } from 'rxjs/operators';

// import { toPromise } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket;

  constructor( public http: HttpClient) 
  { // connection is beiong create/handshake is happening
    this.socket = io(this.url);
  }

  // events to be listened
  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      }); //end socket
    }); //end observable
  } // end disconnect socket
  

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on("online-user-list", (userList) => {
        observer.next(userList);
      }); //end socket
    }); //end Observable
  } // end online user list

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      }); // end socket
    }); //end observable 
  } // end disconnect socket

  // end events to be listened

  // events to be emitted start
  public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  } // end set user
  // events to be emitted end

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof Error)
    {
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else
    {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);

    return Observable.throw(errorMessage);
  } // end ErrorHandler
}
