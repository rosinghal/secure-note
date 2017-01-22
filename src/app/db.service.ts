import { Injectable } from '@angular/core';
declare function require(a)

var PouchDB = require("pouchdb")

@Injectable()
export class DbService {

  db: any; username: any; password: any; remote: any; data: any;

  constructor() {
    this.db = new PouchDB('test');

    // this.db.put({
    //   _id: 'dave@gmail.com' + Math.random(),
    //   name: 'David',
    //   age: 69
    // });

    // this.db.changes().on('change', function() {
    //   console.log('Ch-Ch-Changes');
    // });
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

  addNote(subject, body) {
    this.db.put({
      _id: 'note' + Math.random(),
      subject: subject,
      body: body
    });

    this.db.changes().on('change', function() {
      console.log('Ch-Ch-Changes');
    });
  }

  getNotes() {
    return this.db.allDocs({
      include_docs: true,
      attachments: true
    });
  }

}
