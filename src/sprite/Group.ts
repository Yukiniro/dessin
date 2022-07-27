import constant from '../constant/constant';
import CollectionMixin from '../mixin/collection.mixin';
import { GroupJSON } from '../types/types';
import {
  extendsValue,
  localityRect,
  unlocalityRect,
  wrapRects,
  wrapRectWithAngle,
} from '../util/util';
import Sprite from './Sprite';

class Group extends CollectionMixin(Sprite) {
  constructor(props: GroupJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_GROUP;
    this.fromJSON(props);
  }

  protected _wrapChildren(): void {
    const rects = this.all().map((sprite) => {
      return wrapRectWithAngle(sprite.rect, sprite.getAngle());
    });
    const { x, y, width, height } = wrapRects(rects);
    this.setPos({ x, y }).setSize({ width, height });
  }

  protected _unlocalityChildren(): void {
    this.forEachItem((sprite) => {
      const { x, y, width, height } = unlocalityRect(sprite.rect, this.rect);
      sprite.setPos({ x, y }).setSize({ width, height });
    });
  }

  protected _localityChildren() {
    this.forEachItem((sprite) => {
      const { x, y, width, height } = localityRect(sprite.rect, this.rect);
      sprite.setPos({ x, y }).setSize({ width, height });
    });
  }

  fromJSON(data: GroupJSON): this {
    super.fromJSON(data);
    extendsValue.call(this, 'items', data.items, []);
    return this;
  }

  toJSON(): GroupJSON {
    return {
      ...super.toJSON(),
      items: this.mapItem((item) => item.toJSON()),
    };
  }

  renderCache(): this {
    this._cacheView.width = this.getWidth();
    this._cacheView.height = this.getHeight();
    this.forEachItem((item) => item.render(this._cacheCtx));
    return this;
  }

  render(ctx: CanvasRenderingContext2D): this {
    ctx.drawImage(this._cacheView, this.getX(), this.getY(), this.getWidth(), this.getHeight());
    return this;
  }

  group(items: Array<Sprite>): this {
    items.forEach((item) => this.add(item));
    this._wrapChildren();
    this._localityChildren();
    this.renderCache();
    return this;
  }

  ungroup(): this {
    this._unlocalityChildren();
    this.removeAll();
    return this;
  }
}

export default Group;
