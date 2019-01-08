import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chatbox/chatbox.component';
import { RouterModule, Routes, Router } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from '../shared/user-details/user-details.component';
import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent }
    ]),
    SharedModule
  ],
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe]
})
export class ChatModule { }
