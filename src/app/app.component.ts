import { Component, ViewChild } from "@angular/core";
import { ConvexHullComponent } from "./convex-hull/convex-hull.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "visualalgo";

  @ViewChild(ConvexHullComponent, { static: true }) child: ConvexHullComponent;

  informCVAdd() {
    this.child.addDataSet(5);
  }

  informCVRemove() {
    this.child.removeDatasets(5);
  }
}
