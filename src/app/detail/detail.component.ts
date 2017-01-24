///<reference path="../../../node_modules/rxjs/add/operator/switchMap.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {DbService} from "../db.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form: any;
  noteId: string;
  loading: boolean;

  constructor(
    private db:DbService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar) {
    this.form = {
      subject: null,
      body: null
    };
  }

  addNote() {
    var vm = this;
    this.loading = true;
    vm.db.addDoc(vm.form.subject, vm.form.body, vm.form._rev, vm.form._id)
      .then(function (note) {
        vm.loading = false;
        if(vm.form._rev) {
          vm.snackBar.open('Note updated', 'Ok', {
            duration: 2000
          });
          vm.form._id = note.id;
          vm.form._rev = note.rev;
        } else {
          vm.snackBar.open('Note created', 'Ok', {
            duration: 2000
          });
          vm.router.navigate(['/note', note.id]);
        }
      });
  }

  deleteNote() {
    var vm = this;
    if(vm.form._id && vm.form._rev) {
      vm.db.deleteDoc(vm.form._id, vm.form._rev)
        .then(function () {
          vm.snackBar.open('Note deleted', 'Ok', {
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
        });
    }
  }

}
