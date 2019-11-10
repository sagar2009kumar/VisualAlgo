import { Component, OnInit, AfterViewInit } from "@angular/core";
import { defaultColors, ChartsModule, ThemeService } from "ng2-charts";
import { Chart, ChartOptions } from "chart.js";
import { slopeLinePlugin } from "./line-draw-plugin";
import { QuickHull } from "./convex-hull-algo";
import { Point } from "./convex-hull-algo";

@Component({
  selector: "app-convex-hull",
  templateUrl: "./convex-hull.component.html",
  styleUrls: ["./convex-hull.component.css"]
})
export class ConvexHullComponent implements OnInit, AfterViewInit {
  public bubbleChartColor = defaultColors;
  public convexHull;
  public bubbleChartOptions;

  public bubbleChartColorBackup = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)"
  ];

  private _selectedTheme = "dark-theme";
  public bubbleChartLabels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public bubbleChartType = "bubble";
  public bubbleChartLegend = false;
  public bubbleChartData = [
    { data: { x: -22, y: 22, r: 10 }, label: "200" },
    { data: { x: 22, y: 21, r: 10 }, label: "200" },
    { data: { x: 12, y: 18, r: 10 }, label: "200" },
    { data: { x: 14, y: 16, r: 10 }, label: "200" },
    { data: { x: -10, y: 11, r: 10 }, label: "200" },
    { data: { x: 4, y: 4, r: 10 }, label: "200" },
    {
      data: { x: 19, y: 14, r: 10 },
      label: "200"
    }
  ];

  constructor(
    private slopeLinePlugins: slopeLinePlugin,
    private themeService: ThemeService,
    private quickHull: QuickHull
  ) {
    const pointArr = [];
    this.bubbleChartData.forEach((element, index) => {
      pointArr.push(new Point(element.data.x, element.data.y, index, 0));
    });
    this.convexHull = this.quickHull.getConvexHull(pointArr);
    this.bubbleChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      plugins: {
        linedraw: {
          lineAtIndex: this.convexHull
        }
      }
    };
    Chart.plugins.register(this.slopeLinePlugins.verticalLinePlugin);
  }

  ngOnInit() {}

  selectedTheme(value: string) {
    this._selectedTheme = value;
    let overrides: ChartOptions;
    if (this._selectedTheme === "dark-theme") {
      overrides = {
        legend: {
          labels: { fontColor: "white" }
        },
        scales: {
          xAxes: [
            {
              ticks: { fontColor: "white" },
              gridLines: { color: "rgba(255,255,255,0.1)" }
            }
          ],
          yAxes: [
            {
              ticks: { fontColor: "white" },
              gridLines: { color: "rgba(255,255,255,0.1)" }
            }
          ]
        }
      };
    } else {
      overrides = {};
    }
    this.themeService.setColorschemesOptions(overrides);
  }

  ngAfterViewInit() {}
}
