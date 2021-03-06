// import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterialModule} from "@angular/material";
import 'hammerjs';
// import { LayoutComponent } from './layout/layout.component';
import {DbService} from "./extras/db.service";
import {CommonModule} from "@angular/common";
import { SafeHtmlPipe } from './extras/safe-html.pipe';
import {AppRoutingModule} from "./app-routing.module";
import {DetailModule} from "./detail/detail.module";
import {ListComponent} from "./list/list.component";
import {HomeModule} from "./home/home.module";
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    // LayoutComponent,
    SafeHtmlPipe,
    ListComponent,
    ProductAddDialogComponent
  ],
  entryComponents: [
    ProductAddDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    CommonModule,
    DetailModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
