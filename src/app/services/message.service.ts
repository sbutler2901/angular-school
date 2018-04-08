import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  /** Adds messages to list */
  add(message: string) {
    console.log(message);
    this.messages.push(message);
  }

  /** Deletes all stored messages from list */
  clear() {
    this.messages = [];
  }
}
