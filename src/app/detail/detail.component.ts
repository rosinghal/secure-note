import { Component, OnInit } from '@angular/core';
import {DbService} from "../extras/db.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {FileUploader} from "ng2-file-upload";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  doc: any;
  noteId: string;
  loading: boolean;
  content$ = new Subject<string>();
  attachments: Array<any>;
  public uploader:FileUploader = new FileUploader({url: '/api/'});

  constructor(
    private db:DbService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar,
    private sanitizer:DomSanitizer) {

    this.doc = {};
    this.attachments = [];

    this.content$.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(body => this.db.updateNote(this.doc))
      .subscribe((note:any) => this.handleResponse(note));
  }

  handleResponse(note:any):void {
    this.doc._rev = note.rev;
  }

  deleteNote() {
    var vm = this;
    if(vm.doc._id && vm.doc._rev) {
      vm.db.deleteDoc(vm.doc._id, vm.doc._rev)
        .then(function () {
          vm.snackBar.open('Note deleted', null, <MdSnackBarConfig>{
            duration: 2000
          });
          vm.router.navigate(['']);
        });
    }
  }

  getAttachments():void {
    var vm = this;
    if(this.doc.hasOwnProperty('_attachments')) {
      Object.keys(this.doc._attachments).map((key:string):string => {
        vm.db.getAttachmentBlob(vm.doc._id, key)
          .then(function (blobOrBuffer:any):void {
            var file = vm.db.getBlobDetail(blobOrBuffer, key);
            vm.attachments.push(file);
          });
        return key;
      });
    }
  }

  uploadAttachment(fileObj:any) {
    var vm = this;
    if(vm.doc._id && vm.doc._rev) {
      vm.db.uploadAttachment(vm.doc._id, vm.doc._rev, fileObj)
        .then(function (response:any) {
          vm.uploader.clearQueue();
          console.log(response);
          vm.handleResponse(response.note);
          vm.attachments.push(response.file);
        })
        .catch(console.log.bind(console));
    }
  }

  fileOver(e:any):void {
    if(this.uploader.getNotUploadedItems().length) {
      this.uploadAttachment(this.uploader.getNotUploadedItems()[0]._file);
    }
  }

  ngOnInit() {
    this.loading = true;
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.db.getDoc(params['id']))
      .subscribe((note: any) => {
        console.log(note);
        this.attachments = [];
        this.loading = false;
        this.doc = note;
        this.getAttachments();
      }, (error: any) => {
        console.log(error);
        this.snackBar.open('Note : ' + error.message, 'Ok', <MdSnackBarConfig>{
          duration: 2000
        });
        this.router.navigate(['']);
      });
  }

}
