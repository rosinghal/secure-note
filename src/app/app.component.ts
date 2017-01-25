import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  projects:Array<string> = [];
  selectedProject:string = 'Default';

  onNotify(projects:any):void {
    this.projects = projects;
  }

  constructor() {}
}
