import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input
} from "@angular/core";
import {
  defaultColors,
  ChartsModule,
  ThemeService,
  BaseChartDirective
} from "ng2-charts";
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
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  public bubbleChartColor = defaultColors;
  public convexHull;
  public bubbleChartOptions;
  public MIN_XY = -50;
  public MAX_XY = 50;
  public selectedColor = "#081f3e";
  // Now you can reference your chart via `this.chart`

  // tslint:disable-next-line: variable-name
  private _selectedTheme = "dark-theme";
  public bubbleChartLabels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public bubbleChartType = "bubble";
  public bubbleChartLegend = false;
  public bubbleChartData = [
    /* { data: { x: -22, y: 22, r: 10 } },
    { data: { x: 22, y: 21, r: 10 } },
    { data: { x: 12, y: 18, r: 10 } },
    { data: { x: 14, y: 16, r: 10 } },
    { data: { x: -10, y: 11, r: 10 } },
    { data: { x: 4, y: 4, r: 10 } },
    { data: { x: 19, y: 14, r: 10 } } */
  ];
  // tslint:disable-next-line: variable-name
  _seed: number;

  constructor(
    private slopeLinePlugins: slopeLinePlugin,
    private themeService: ThemeService,
    private quickHull: QuickHull
  ) {
    this.generateRandomPoints(5, true);
    this.generateConvexHull(true);
  }

  generateConvexHull(isInitialize: boolean = false) {
    const pointArr = [];
    if (isInitialize) {
      this.bubbleChartData.forEach((element, index) => {
        pointArr.push(new Point(element.data.x, element.data.y, index, 0));
      });
    } else {
      this.bubbleChartData[0].data.forEach((element, index) => {
        pointArr.push(new Point(element.x, element.y, index, 0));
      });
    }
    this.convexHull = this.quickHull.getConvexHull(pointArr);
    this.bubbleChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      /* legend: {
        display: true,
        labels: {
          fontColor: "rgb(255, 99, 132)",
          text: "Convex Hull",
          fontFamily: "Helvetica"
        }
      }, */
      title: {
        display: true,
        fontColor: "#007bff", // can Add title color also
        text: "Convex Hull",
        fontSize: 18
      },
      plugins: {
        linedraw: {
          lineAtIndex: this.convexHull
        }
      },
      elements: {
        point: {
          backgroundColor: () => {
            return this.selectedColor;
          },

          borderColor: this.colorize.bind(null, true),

          borderWidth: context => {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },

          hoverBackgroundColor: "rgb(153, 204, 0)",

          hover: () => {
            console.log("hello");
          }
        }
      },
      onClick: event => {
        if (event.detail === 1) {
          // it was a single click
          //this.chartClicked(event);
          /*  console.log(this.chart.toBase64Image());
          console.log(this.chart.data);
          console.log(this.chart.getElementsAtEvent(event)); */
        } else if (event.detail === 2) {
          // it was a double click
          console.log(event.detail);
        }
      },
      chartClick: event => {
        console.log("hll");
      }
    };
    Chart.plugins.register(this.slopeLinePlugins.verticalLinePlugin);
  }

  colorize(opaque, context) {
    var value = { x: 102, y: 107, v: 103 };
    var x = value.x / 100;
    var y = value.y / 100;
    var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
    var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
    var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
    var a = opaque ? 1 : (0.5 * value.v) / 1000;

    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  ngOnInit() {
    this.selectedTheme(this._selectedTheme);
  }

  selectedTheme(value: string) {
    this._selectedTheme = value;
    let overrides: ChartOptions;
    if (this._selectedTheme === "dark-them") {
      overrides = {
        legend: {
          labels: { fontColor: "blue" }
        },
        scales: {
          xAxes: [
            {
              ticks: { fontColor: "blue" },
              gridLines: {
                color: "rgba(255,255,255,0.1)"
              }
            }
          ],
          yAxes: [
            {
              ticks: { fontColor: "blue" },
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

  removeDatasets(eventData: number) {
    if (this.bubbleChartData[0].data.length <= 5) {
      alert("Can't remove more points. Minimum no of points are 5");
    } else {
      this.bubbleChartData[0].data.splice(
        this.bubbleChartData[0].data.length - 5,
        5
      );
      this.generateConvexHull();
      this.chart.chart.update();
    }
  }

  addDataSet(eventData: number) {
    this.generateRandomPoints(eventData);
    this.generateConvexHull();
    this.chart.chart.update();
  }

  generateRandomPoints(DATA_COUNT: number, isInitialize: boolean = false) {
    for (let i = 0; i < DATA_COUNT; ++i) {
      if (!isInitialize) {
        this.bubbleChartData[0].data.push({
          x: this.rand(this.MIN_XY, this.MAX_XY),
          y: this.rand(this.MIN_XY, this.MAX_XY),
          r: 10
        });
      } else {
        this.bubbleChartData.push({
          data: {
            x: this.rand(this.MIN_XY, this.MAX_XY),
            y: this.rand(this.MIN_XY, this.MAX_XY),
            r: 10
          }
        });
      }
    }
  }

  rand(min, max) {
    if (this._seed == null) {
      this._seed = Date.now();
    }
    var seed = this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  /* chartClicked(event) {
    var activePoints = this.chart.getElementsAtEvent(event);
  var firstPoint = activePoints[0];
  if(firstPoint !== undefined){
    var label = this.chart.data[0].labels[firstPoint._index];
    var value = this.chart.data[0].datasets[firstPoint._datasetIndex].data[firstPoint._index];

    alert(label + ": " + value.x);
    alert(label + ": " + value.y);
  } */
}
