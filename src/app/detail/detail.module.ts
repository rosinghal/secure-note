import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DetailRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
