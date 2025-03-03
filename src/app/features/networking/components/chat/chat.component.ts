import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true, // ✅ Important for standalone usage
  imports: [CommonModule, FormsModule], // ✅ Import required modules
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages: Message[] = [];
  newMessage: string = '';

  constructor() {
    // Example: Simulate receiving a bot message after 1 second
    setTimeout(() => {
      this.addBotMessage('Welcome to the chat!');
    }, 1000);
  }

  // ✅ Add a user message and simulate bot reply
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'user',
        content: this.newMessage,
        timestamp: new Date(),
      });

      // Simulate a bot reply after a short delay
      this.autoReply();

      this.newMessage = ''; // Clear input field
    }
  }

  // ✅ Auto-reply function (can be replaced with real WebSocket integration)
  private autoReply(): void {
    setTimeout(() => {
      const replies = ['Hello!', 'How can I assist you?', 'Good to see you!', 'I am here to help.'];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      this.addBotMessage(randomReply);
    }, 1000);
  }

  // ✅ Helper method to add bot messages
  private addBotMessage(content: string): void {
    this.messages.push({
      sender: 'bot',
      content,
      timestamp: new Date(),
    });
  }
}
