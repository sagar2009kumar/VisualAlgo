import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConvexHullComponent } from "./convex-hull/convex-hull.component";
import { ChartsModule, ThemeService } from "ng2-charts";
import { slopeLinePlugin } from "./convex-hull/line-draw-plugin";
import { QuickHull } from "./convex-hull/convex-hull-algo";

@NgModule({
  declarations: [AppComponent, ConvexHullComponent],
  imports: [BrowserModule, AppRoutingModule, ChartsModule],
  providers: [slopeLinePlugin, QuickHull, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
