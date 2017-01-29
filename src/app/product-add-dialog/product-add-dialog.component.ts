import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {DbService} from "../db.service";

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  newDb:any;

  constructor(
    public dialogRef: MdDialogRef<ProductAddDialogComponent>,
    private db:DbService
  ) {
    this.newDb = {
      name: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.db.createDB(this.newDb.name);
    this.dialogRef.close(this.newDb.name);
  }

}
