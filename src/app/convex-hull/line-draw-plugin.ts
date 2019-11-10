// tslint:disable-next-line: class-name
export class slopeLinePlugin {
  public verticalLinePlugin = {
    id: "linedraw",
    cvHullPoints: null,
    n: 0,
    getLinePosition(chart, pointIndex) {
      const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
      const data = meta.data;
      return { x: data[pointIndex]._model.x, y: data[pointIndex]._model.y };
    },
    renderVerticalLine(chartInstance, pointIndex, index) {
      /* console.log(
        pointIndex + " helo " + this.cvHullPoints[(pointIndex + 1) % this.n]
      ); */
      const initPoint = this.getLinePosition(chartInstance, pointIndex);
      const finalPoint = this.getLinePosition(
        chartInstance,
        this.cvHullPoints[(index + 1) % this.n]
      );
      const scale = chartInstance.scales["y-axis-0"];
      const context = chartInstance.chart.ctx;

      // render vertical line
      context.beginPath();
      context.strokeStyle = "#22cf4a";
      context.moveTo(initPoint.x, initPoint.y);
      context.lineTo(finalPoint.x, finalPoint.y);
      context.stroke();
    },

    renderLastLine(chartInstance) {
      const initPoint = this.getLinePosition(
        chartInstance,
        this.cvHullPoints[this.n - 1]
      );
      const finalPoint = this.getLinePosition(chartInstance, 0);
      const scale = chartInstance.scales["y-axis-0"];
      const context = chartInstance.chart.ctx;

      // render vertical line
      context.beginPath();
      context.strokeStyle = "#22cf4a";
      context.moveTo(initPoint.x, initPoint.y);
      context.lineTo(finalPoint.x, finalPoint.y);
      context.stroke();
    },

    afterEvent(chart, easing) {
      this.cvHullPoints = chart.config.options.plugins.linedraw.lineAtIndex;
      this.n = this.cvHullPoints.length;
      if (this.cvHullPoints) {
        this.cvHullPoints.forEach((pointIndex, index) =>
          this.renderVerticalLine(chart, pointIndex, index)
        );
        this.renderLastLine(chart);
      }
    }
  };
}
