import { Component, OnInit } from "@angular/core";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConvexHullComponent } from "../convex-hull/convex-hull.component";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.matDialog.open(ConvexHullComponent, dialogConfig);
  }
}
