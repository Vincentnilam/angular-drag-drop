import { Component, signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-drag-drop');

  players = [
    'Cliven',
    'Darren',
    'Vincent',
  ];

  sourcePlayers = ['Toby', 'Michelle', 'Matthew', 'Yuen Lin'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === "cdk-drop-list-1") {
        if (this.players.length == 4) {
          return;
        } else {
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
      
    }
    
  }

  clickDone() {
    this.sourcePlayers = [...this.sourcePlayers, ...this.players];
    this.players = [];
  }
}
