import {Injectable, NgZone} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
declare function require(a)

var PouchDB = require("pouchdb")

@Injectable()
export class DbService {

  db: any; username: any; password: any; remote: any; data: any;

  constructor(public zone: NgZone, private sanitizer:DomSanitizer) {
    this.createDB('Default');
  }

  createDB(dbName, remoteUrl = null, remoteUsername = null, remotePassword = null) {
    this.db = new PouchDB(dbName);
    // this.username = 'DATABASE_KEY';
    // this.password = 'YOUR_PASSWORD';
    //
    if(remoteUrl && remoteUsername && remotePassword) {
      this.remote = remoteUrl; //'https://YOU_ACCOUNT_NAME.cloudant.com/YOUR_DATABASE';
      this.username = remoteUsername;
      this.password = remotePassword;

      let options = {
        live: true,
        retry: true,
        continuous: true,
        auth: {
          username: this.username,
          password: this.password
        }
      };

      this.db.sync(this.remote, options);
    }
  }

  allDBNames() {
    // window.indexedDB.webkitGetDatabaseNames().onsuccess = (e) => {
    //   for(let i = 0; i < e.target.result.length; i++){
    //     let db = e.target.result[i];
    //     if(db.startsWith('_pouch_')){
    //       console.log(db.re);
    //     }
    //   }
    // };
  }

  deleteDb() {
    this.db.destroy();
  }

  uploadAttachment(_docId, _revId, fileObj) {
    var vm = this;
    // var attachment = new Blob(['Is there life on Mars?'], {type: 'text/plain'});
    var _attachmentId = fileObj.name + '~!@#$%^&*()_+' + Math.random();
    return this.db.putAttachment(_docId, _attachmentId, _revId, fileObj, fileObj.type)
      .then(function (note) {
        return {note: note, blob: vm.getAttachmentBlob(_docId, _attachmentId)};
      })
      .then(function ({note, blob}) {
        return blob.then(function (blobOrBuffer) {
          return {
            note,
            file: vm.getBlobDetail(blobOrBuffer, _attachmentId)
          };
        });
      });
  }

  getAttachmentBlob(_docId, _attachmentId) {
    return this.db.getAttachment(_docId, _attachmentId);
  }

  getBlobDetail(blobOrBuffer, _attachmentId) {
    return {
      name: _attachmentId.substr(0, _attachmentId.indexOf('~!@#$%^&*()_+')),
      url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blobOrBuffer)),
      // size: blobOrBuffer.size,
      // type: blobOrBuffer.type
    };
  }

  addNote(defaultObj = {content: ''}) {
    return this.db.post(defaultObj);
  }

  updateNote(doc) {
    return this.db.put(doc);
  }

  getDoc(_id:string) {
    return this.db.get(_id, {
      include_docs: true,
      attachments: true
    });
  }

  deleteDoc(_id:string, _rev:string) {
    return this.db.remove(_id, _rev);
  }

  getDocuments(){

    return new Promise(resolve => {

      this.db.allDocs({
        include_docs: true,
        attachments: true
      }).then((result) => {

        this.data = [];
        result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.db.changes({
          live: true,
          since: 'now',
          include_docs: true
        }).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch(console.log.bind(console));
    });

  }

  handleChange(change){
    this.zone.run(() => {
      let changedDoc = null;
      let changedIndex = null;
      this.data.forEach((doc, index) => {
        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }
      });

      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }
      else {
        //A document was updated
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }
        //A document was added
        else {
          this.data.push(change.doc);
        }
      }
    });
  }

}
