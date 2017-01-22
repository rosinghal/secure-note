import { Component, OnInit } from '@angular/core';
import {DbService} from "../db.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form: any;

  constructor(private db:DbService) {
    this.form = {
      subject: null,
      body: null
    };
  }

  addNote() {
    this.db.addNote(this.form.subject, this.form.body);
  }

  ngOnInit() {
  }

}
