import { Component, OnInit } from "@angular/core";
import { defaultColors, ChartsModule } from "ng2-charts";
import { Chart } from "chart.js";
import { slopeLinePlugin } from "./line-draw-plugin";

@Component({
  selector: "app-convex-hull",
  templateUrl: "./convex-hull.component.html",
  styleUrls: ["./convex-hull.component.css"]
})
export class ConvexHullComponent implements OnInit {
  public bubbleChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      linedraw: {
        lineAtIndex: [0, 1]
      }
    }
  };

  public bubbleChartColor = defaultColors;

  public bubbleChartColorBackup = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)"
  ];

  public bubbleChartLabels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public bubbleChartType = "bubble";
  public bubbleChartLegend = false;
  public bubbleChartData = [
    { data: { x: -22, y: 22, r: 10 }, label: "200" },
    { data: { x: 22, y: 21, r: 10 }, label: "200" },
    { data: { x: 12, y: 18, r: 10 }, label: "200" },
    {
      data: { x: 19, y: 14, r: 10 },
      label: "200"
    }
  ];

  constructor(private slopeLinePlugin: slopeLinePlugin) {}

  ngOnInit() {
    Chart.pluginService.register(this.slopeLinePlugin.verticalLinePlugin);
  }
}
