import Sprite from '../sprite/Sprite';

export interface Pos {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Pos, Size {}

export interface SpriteJSON {
  id?: string;
  type?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  angle?: number;
  originX?: number;
  originY?: number;
  flipX?: number;
  flipY?: number;
  opacity?: number;
}

export interface TextJSON extends SpriteJSON {
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: number | string;
  fontFamily?: string;
  textAlign?: string;
  lineHeight?: number;
  texts?: Array<string>;
  fillColor?: string;
  strokeColor?: string;
}

export interface RectJSON extends SpriteJSON {
  fillColor?: string;
}

export interface CircleJSON extends SpriteJSON {
  fillColor?: string;
  radius?: number;
}

export interface GroupJSON extends SpriteJSON {
  items?: Array<Sprite>;
  isTemporary?: boolean;
}

export interface CanvasJSON {
  size?: Size;
  backgroundColor?: string;
  sprites?: Array<SpriteJSON>;
}

export interface TrackWithOnwer extends TrackJSON {
  owner: any;
}

export interface EncodeJSON extends SpriteJSON, TextJSON, RectJSON, CircleJSON {}

export interface TrackJSON {
  supportNodes?: Array<number>;
  lineColor?: string;
  nodeColor?: string;
  nodeHoverColor?: string;
  nodeBorderColor?: string;
  nodeRadius?: number;
}

export interface Font {
  fontSize: number;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string | number;
}

export interface TextSize {
  width: number;
  height: number;
  fontBoundingBoxAscent: number;
}

export interface TrackNodes {
  LEFT_TOP: number;
  CENTER_TOP: number;
  RIGHT_TOP: number;
  RIGHT_CENTER: number;
  RIGHT_BOTTOM: number;
  CENTER_BOTTOM: number;
  LEFT_BOTTOM: number;
  LEFT_CETNER: number;
  SELF: number;
  ROTATE: number;
  NONE: number;
}

export type Constructor = new (...args: any[]) => {};
