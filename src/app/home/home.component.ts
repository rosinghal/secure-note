import { Component, OnInit } from '@angular/core';
import {DbService} from "../db.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private db:DbService,
    private router: Router
  ) { }

  addNote() {
    var vm = this;
    vm.db.addNote()
      .then(function (note:any):void {
        vm.router.navigate(['/note', note.id]);
      });
  }

  ngOnInit() {
  }

}
