import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from "@angular/material";
import 'hammerjs';
import { LayoutComponent } from './layout/layout.component';
import {DbService} from "./db.service";
import {CommonModule} from "@angular/common";
import { SafeHtmlPipe } from './safe-html.pipe';
// import {DetailModule} from "./detail/detail.module";
// import {ListModule} from "./list/list.module";
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./detail/detail.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SafeHtmlPipe,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CommonModule,
    // DetailModule,
    // ListModule
  ],
  providers: [
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
