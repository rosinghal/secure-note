import { Component } from '@angular/core';
import {MdDialog} from "@angular/material";
import {ProductAddDialogComponent} from "./product-add-dialog/product-add-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  projects:Array<string> = [];
  selectedProject:string = 'Default';

  onNotify(projects:any):void {
    this.projects = projects;
  }

  newProject() {
    let dialogRef = this.dialog.open(ProductAddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  constructor(
    public dialog: MdDialog
  ) {}
}
