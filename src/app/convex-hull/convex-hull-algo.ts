import { element } from "protractor";

export class Point {
  constructor(
    public first: number,
    public second: number,
    public index: number,
    public angle: number
  ) {}
}

export class QuickHull {
  error = true;
  n: number;
  point: Point[];
  hull: any;

  constructor() {}
  // it is used to decide whether the two points lie on the
  // same side of the plane or not
  // This is simply the point form of the line i.e all the line
  // if d is equal to zero then the point lies on the line
  // if d has the same sign then the point lies on the same side
  // of the line otherwise lies on the other side of the line
  // tslint:disable-next-line: align
  decideface(a: Point, b: Point, c: Point) {
    const d =
      (c.second - a.second) * (b.first - a.first) -
      (b.second - a.second) * (c.first - a.first);
    if (d > 0) {
      return 1;
    }
    if (d < 0) {
      return -1;
    }
    return 0;
  }

  sortClockWise(points: Point[]) {
    // Find min max to get center
    // Sort from top to bottom
    points.sort((a, b) => a.second - b.second);

    // Get center y
    const cy = (points[0].second + points[points.length - 1].second) / 2;

    // Sort from right to left
    points.sort((a, b) => b.first - a.first);

    // Get center x
    const cx = (points[0].first + points[points.length - 1].first) / 2;

    // Center point
    let center = {
      x: cx,
      y: cy
    };

    // Pre calculate the angles as it will be slow in the sort
    // As the points are sorted from right to left the first point
    // is the rightmost

    // Starting angle used to reference other angles
    let startAng;
    points.forEach(point => {
      let ang = Math.atan2(point.second - center.y, point.first - center.x);
      if (!startAng) {
        startAng = ang;
      } else {
        if (ang < startAng) {
          // ensure that all points are clockwise of the start point
          ang += Math.PI * 2;
        }
      }
      point.angle = ang; // add the angle to the point
    });

    // first sort clockwise
    points.sort((a, b) => a.angle - b.angle);

    // then reverse the order
    const ccwPoints = points.reverse();

    // move the last point back to the start
    ccwPoints.unshift(ccwPoints.pop());

    return ccwPoints;
  }

  // line distance it is used to decide how far the distance of a point
  // is w.r.t to the given lines ax+by+c which is given by the formula
  // |ax+by+c|/(root(a^2+b^2));
  // in this section we take only the proportionality of the distance
  // which is ultimately the distance formula with the absolute function
  // associated with it
  // There is the line equation and the point. Firstly the line has been
  // converted into the line and then the point is then put into it

  // tslint:disable-next-line: align
  lineDist(a: Point, b: Point, c: Point) {
    return Math.abs(
      (c.second - a.second) * (b.first - a.first) -
        (b.second - a.second) * (c.first - a.first)
    );
  }

  // This is the main quickHULL function that does the quickhull
  // tslint:disable-next-line: align
  quickHULL(
    leftMost: number,
    rightMost: number,
    face: number,
    point: Point[],
    n: number
  ) {
    let ind = -1; // This is the index where we have to divide
    let max_dist = 0; // it should be zero because of the fact that
    // it also check the point segment on the same
    // line

    // Maximum point has been found in the following loop
    let temp = 0;
    for (let i = 0; i < n; i++) {
      temp = this.lineDist(point[leftMost], point[rightMost], point[i]);
      if (
        temp > max_dist &&
        this.decideface(point[leftMost], point[rightMost], point[i]) == face
      ) {
        ind = i;
        max_dist = temp;
      }
    }

    // if the index has not been changed i.e no point has been detected to the sides
    // then add the both end point to the convex hull because these are the only end
    // point containing in the hull
    if (ind == -1) {
      this.hull.add(point[leftMost]);
      this.hull.add(point[rightMost]);
      return;
    }

    // recurr to the both sides
    this.quickHULL(
      ind,
      leftMost,
      -this.decideface(point[ind], point[leftMost], point[rightMost]),
      point,
      n
    );
    this.quickHULL(
      ind,
      rightMost,
      -this.decideface(point[ind], point[rightMost], point[leftMost]),
      point,
      n
    );
  }

  // tslint:disable-next-line: align
  quickHull(point: Point[]) {
    if (this.n < 3) {
      debugger;
      // quickhull can't be formed by the two lines
      return;
    }
    // finding the maximum and the minimum point
    let n = this.n;
    let max: number;
    let max_ind = 0;
    let min_ind = 0;
    for (let i = 1; i < n; i++) {
      if (point[min_ind].first > point[i].first) {
        min_ind = i;
      }
      if (point[max_ind].first < point[i].first) {
        max_ind = i;
      }
    }
    // recurring to the both sides
    this.quickHULL(min_ind, max_ind, 1, point, n); // for one side of the polygon
    this.quickHULL(min_ind, max_ind, -1, point, n); // for the other side of polygon
  }

  // tslint:disable-next-line: align
  getConvexHull(points: Point[]) {
    this.n = points.length;
    this.hull = new Set();
    this.point = points;
    this.quickHull(this.point);
    const sortPoint = [];
    this.sortClockWise(Array.from(this.hull)).forEach(element => {
      sortPoint.push(element.index);
    });
    return sortPoint;
  }
}
