import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public currentClass = "navbar navbar-expand-sm bg-dark navbar-dark";
  constructor() {}

  ngOnInit() {
    // https://dynamic.brandcrowd.com/asset/merch/e9c71423-c1d8-491b-8b3a-ecd991f14824/signage.png?v=4&text=&w=1500
    // https://dynamic.brandcrowd.com/asset/merch/da08db7b-dce6-4717-8d44-621b0644e4dc/signage.png?v=4&text=&w=1000
    // https://dynamic.brandcrowd.com/asset/merch/e9c71423-c1d8-491b-8b3a-ecd991f14824/signage.png?v=4&text=&w=1000
    // https://dynamic.brandcrowd.com/asset/merch/e9c71423-c1d8-491b-8b3a-ecd991f14824/signage.png?v=4&text=&w=1000
  }

  @HostListener("window:scroll", ["$event"])
  changeHeaderClass(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    if (window.pageYOffset > 8) {
      this.currentClass = "navbar navbar-expand-sm bg-dark sticky";
    } else {
      //this.currentClass = "navbar navbar-expand-sm bg-dark navbar-dark";
    }
  }
}
