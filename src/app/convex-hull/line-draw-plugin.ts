// tslint:disable-next-line: class-name
export class slopeLinePlugin {
  public verticalLinePlugin = {
    id: "linedraw",
    getLinePosition(chart, pointIndex) {
      const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
      const data = meta.data;
      return data[pointIndex]._model.x;
    },
    renderVerticalLine(chartInstance, pointIndex) {
      const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
      const scale = chartInstance.scales["y-axis-0"];
      const context = chartInstance.chart.ctx;

      // render vertical line
      context.beginPath();
      context.strokeStyle = "#ff0000";
      context.moveTo(lineLeftOffset, scale.top);
      context.lineTo(lineLeftOffset, scale.bottom);
      context.stroke();

      // write label
      context.fillStyle = "#ff0000";
      context.textAlign = "center";
      context.fillText(
        "MY TEXT",
        lineLeftOffset,
        (scale.bottom - scale.top) / 2 + scale.top
      );
    },

    afterDatasetsDraw(chart, easing) {
      var cvHullPoints = chart.config.options.plugins.linedraw.lineAtIndex;
      if (cvHullPoints) {
        cvHullPoints.forEach(pointIndex =>
          this.renderVerticalLine(chart, pointIndex)
        );
      }
    }
  };
}
