import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from "@angular/material";
import 'hammerjs';
// import { LayoutComponent } from './layout/layout.component';
import {DbService} from "./db.service";
import {CommonModule} from "@angular/common";
import { SafeHtmlPipe } from './safe-html.pipe';
import {AppRoutingModule} from "./app-routing.module";
import {DetailModule} from "./detail/detail.module";
import {ListComponent} from "./list/list.component";

@NgModule({
  declarations: [
    AppComponent,
    // LayoutComponent,
    SafeHtmlPipe,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CommonModule,
    DetailModule,
    AppRoutingModule
  ],
  providers: [
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
