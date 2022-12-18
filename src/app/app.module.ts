import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shell/nav-bar/nav-bar.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexComponent } from './index/index.component';
import { LeafletComponent } from './map/leaflet/leaflet.component';
import { MapComponent } from "./map/map.component";
import {ChartsComponent} from "./charts/charts.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    IndexComponent,
    MapComponent,
    LeafletComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
