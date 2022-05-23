import constant from '../constant/constant';
import { GroupJSON, Pos } from '../types/types';
import Group from './Group';
import Sprite from './Sprite';
import Track from './Track';

class SoftGroup extends Group {
  constructor(props: GroupJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_SOFTGROUP;
    this._supportNodes = [8, -1];
    this._track = new Track({ supportNodes: this._supportNodes, owner: this });
  }

  transform(trackNode: number, verctor: Pos, prevEncodeData: object): this {
    this._localityChildren();
    super.transform(trackNode, verctor, prevEncodeData);
    this._unlocalityChildren();
    return this;
  }

  group(items: Sprite[]): this {
    this.removeAll();
    items.forEach((item) => this.add(item));
    this._wrapChildren();
    return this;
  }

  ungroup(): this {
    this.removeAll();
    return this;
  }
}

export default SoftGroup;
