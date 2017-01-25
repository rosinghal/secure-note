import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DbService} from "../db.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  notes: any;
  projects: Array<string> = [];
  @Output() notify: EventEmitter<any> = new EventEmitter();

  constructor(private db:DbService) {
    this.getNotes();
  }

  getNotes() {
    this.db.getDocuments()
      .then( (notes: any) => this.notes = notes);
    // this.db.getDocuments()
    //   .then( (notes: any) => {
    //     this.notes = notes.filter(note => {
    //       if(note.project && this.projects.indexOf(note.project) === -1) {
    //         this.projects.push(note.project);
    //         // this.notify.emit(this.projects);
    //       }
    //       return note.project === 'Default';
    //     });
    //     this.notify.emit(this.projects);
    //   });
  }

  ngOnInit() {
  }

}
