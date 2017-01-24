import {Injectable, NgZone} from '@angular/core';
declare function require(a)

var PouchDB = require("pouchdb")

@Injectable()
export class DbService {

  db: any; username: any; password: any; remote: any; data: any;

  constructor(public zone: NgZone) {
    this.db = new PouchDB('test');
    // this.username = 'DATABASE_KEY';
    // this.password = 'YOUR_PASSWORD';
    //
    // this.remote = 'https://YOU_ACCOUNT_NAME.cloudant.com/YOUR_DATABASE';
    //
    // let options = {
    //   live: true,
    //   retry: true,
    //   continuous: true,
    //   auth: {
    //     username: this.username,
    //     password: this.password
    //   }
    // };
    //
    // this.db.sync(this.remote, options);
  }

  addDoc(subject, body, _rev, _id) {
    if(_rev && _id) { //update old doc
      return this.db.put({
        _id: _id,
        _rev: _rev,
        subject: subject,
        body: body
      });
    } else { //create new doc
      return this.db.post({
        subject: subject,
        body: body
      });
    }
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

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });

        if(result.rows.length === 0) {
          resolve(this.data);
        }

        this.db.changes({
          live: true,
          since: 'now',
          include_docs: true
        }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

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
