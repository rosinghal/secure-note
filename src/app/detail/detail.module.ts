import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
// import {FileSelectDirective, FileDropDirective} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DetailRoutingModule,
    MaterialModule
  ],
  declarations: [
    DetailComponent,
    // FileSelectDirective,
    // FileDropDirective
  ]
})
export class DetailModule { }
