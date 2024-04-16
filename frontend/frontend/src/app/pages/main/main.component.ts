import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  view: string = '';
  setView(selectedView: string): void {
    this.view = selectedView;
  }
}
