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
    this.db.getDocuments()
      .then( (notes: any) => {
        this.notes = notes;
      });
  }

  ngOnInit() {
  }

}
