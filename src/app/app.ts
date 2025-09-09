import { Component, signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Player {
  name: string;
  waitingSince?: Date;
}

@Component({
  selector: 'app-root',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  ngOnInit() {
    setInterval(() => {
      this.sourcePlayers = [...this.sourcePlayers]; // triggers change detection
      this.players = [...this.players];
    }, 1000);
  }

  protected readonly title = signal('angular-drag-drop');

  getWaitingTime(player: Player): string {
    if (!player.waitingSince) {
      return '—';
    }
    const diffMs = new Date().getTime() - player.waitingSince.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  players: Player[] = [
    { name: 'Cliven' },
    { name: 'Darren' },
    { name: 'Vincent' },
  ];

  sourcePlayers: Player[] = [
    { name: 'Toby', waitingSince: new Date() },
    { name: 'Michelle', waitingSince: new Date() },
    { name: 'Matthew', waitingSince: new Date() },
    { name: 'Yuen Lin', waitingSince: new Date() },
  ];

  drop(event: CdkDragDrop<Player[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === "cdk-drop-list-1") {
        if (this.players.length == 4) {
          return;
        } else {
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          const moved = event.container.data[event.currentIndex];
          moved.waitingSince = new Date();
        }
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        const moved = event.container.data[event.currentIndex];
        moved.waitingSince = new Date();
      }
      
    }
    
  }

  clickDone() {
    const returnedPlayers = this.players.map(p => ({
      ...p,
      waitingSince: new Date()
    }));
    this.sourcePlayers = [...this.sourcePlayers, ...returnedPlayers];
    this.players = [];
  }
}
