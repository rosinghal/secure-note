import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DbService} from "../db.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  notes: any;
  projects: Array<string> = [];
  @Output() notify: EventEmitter<any> = new EventEmitter();

  constructor(
    private db:DbService,
    private router: Router
  ) {
    this.getNotes();
  }

  addNote() {
    var vm = this;
    vm.db.addNote()
      .then(function (note:any):void {
        vm.router.navigate(['/note', note.id]);
      });
  }

  getNotes() {
    this.db.getDocuments()
      .then( (notes: any) => this.notes = notes);

    //noinspection TypeScriptUnresolvedFunction
    // window.indexedDB.webkitGetDatabaseNames().onsuccess = (e) => {
    //   for(let i = 0; i < e.target.result.length; i++){
    //     let db = e.target.result[i];
    //     if(db.startsWith('_pouch_')){
    //        indexedDB.deleteDatabase(db);
    //       console.log(db);
    //       this.projects.push(db);
    //     }
    //   }
    //   this.notify.emit(this.projects);
    // };
  }

  ngOnInit() {
  }

}
