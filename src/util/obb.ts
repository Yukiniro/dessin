class OBB {
  protected _centerPoint: Vector2;
  protected _extents: Array<number>;
  protected _axes: Array<Vector2>;
  protected _width: number;
  protected _height: number;
  protected _rotation: number;

  constructor(centerPoint: Vector2, width: number, height: number, rotation: number) {
    this._centerPoint = centerPoint;
    this._extents = [width / 2, height / 2];
    this._axes = [
      new Vector2(Math.cos(rotation), Math.sin(rotation)),
      new Vector2(-1 * Math.sin(rotation), Math.cos(rotation)),
    ];
    this._width = width;
    this._height = height;
    this._rotation = rotation;
  }

  get centerPoint(): Vector2 {
    return this._centerPoint;
  }

  get extents(): Array<number> {
    return this._extents;
  }

  get axes(): Array<Vector2> {
    return this._axes;
  }

  getProjectionRadius(axis: Vector2) {
    return (
      this._extents[0] * Math.abs(axis.dot(this._axes[0])) +
      this._extents[1] * Math.abs(axis.dot(this._axes[1]))
    );
  }
}

class Vector2 {
  protected _x: number = 0;
  protected _y: number = 0;

  constructor(x: number, y: number) {
    this._x = x || 0;
    this._y = y || 0;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }
}

const detectorOBBvsOBB = (OBB1: OBB, OBB2: OBB) => {
  var nv = OBB1.centerPoint.sub(OBB2.centerPoint);
  var axisA1 = OBB1.axes[0];
  if (
    OBB1.getProjectionRadius(axisA1) + OBB2.getProjectionRadius(axisA1) <=
    Math.abs(nv.dot(axisA1))
  )
    return false;
  var axisA2 = OBB1.axes[1];
  if (
    OBB1.getProjectionRadius(axisA2) + OBB2.getProjectionRadius(axisA2) <=
    Math.abs(nv.dot(axisA2))
  )
    return false;
  var axisB1 = OBB2.axes[0];
  if (
    OBB1.getProjectionRadius(axisB1) + OBB2.getProjectionRadius(axisB1) <=
    Math.abs(nv.dot(axisB1))
  )
    return false;
  var axisB2 = OBB2.axes[1];
  if (
    OBB1.getProjectionRadius(axisB2) + OBB2.getProjectionRadius(axisB2) <=
    Math.abs(nv.dot(axisB2))
  )
    return false;
  return true;
};

export { OBB, Vector2, detectorOBBvsOBB };
