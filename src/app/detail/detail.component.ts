import { Component, OnInit } from '@angular/core';
import {DbService} from "../db.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {MdSnackBar} from "@angular/material";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form: any;
  noteId: string;
  loading: boolean;
  subject$ = new Subject<string>();
  body$ = new Subject<string>();

  constructor(
    private db:DbService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar) {
    this.form = {
      subject: null,
      body: null,
      _id: null,
      _rev: null
    };

    this.body$.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(body => this.db.addNote(this.form.subject, body, this.form._rev, this.form._id))
      .subscribe((note:any) => this.handleResponse(note));

    this.subject$.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(subject => this.db.addNote(subject, this.form.body, this.form._rev, this.form._id))
      .subscribe((note:any) => this.handleResponse(note));
  }

  handleResponse(note) {
    if(note) {
      if(this.form._rev && this.form._id) {
        this.form._id = note['id'];
        this.form._rev = note['rev'];
      } else {
        // todo - change url without notifying
        this.router.navigate(['/note', note['id']]);
      }
    }
  }

  deleteNote() {
    var vm = this;
    if(vm.form._id && vm.form._rev) {
      vm.db.deleteDoc(vm.form._id, vm.form._rev)
        .then(function () {
          vm.snackBar.open('Note deleted', null, {
            duration: 2000
          });
          vm.router.navigate(['']);
        });
    }
  }

  ngOnInit() {
    this.route.params.subscribe(data => this.noteId = data['id']);
    if(this.noteId) {
      this.loading = true;
      this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) => this.db.getDoc(params['id']))
        .subscribe((note: any) => {
          this.loading = false;
          this.form = note;
        }, (error: any) => {
          this.snackBar.open('Note : ' + error.message, 'Ok', {
            duration: 2000
          });
          this.router.navigate(['']);
        });
    }
  }

}
