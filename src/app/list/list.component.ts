import { Component, OnInit } from '@angular/core';
import {DbService} from "../db.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  notes: any;
  constructor(private db:DbService) {
    this.getNotes();
  }

  getNotes() {
    this.db.getNotes()
      .then( (notes: any) => {
        console.log(notes);
        this.notes = notes.rows;
      });
  }

  ngOnInit() {
  }

}
