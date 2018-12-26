import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';

import { RouterModule, Routes, Router } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'child', component: ChatboxComponent }
    ])
  ],
  declarations: [ChatboxComponent]
})
export class ChatModule { }
