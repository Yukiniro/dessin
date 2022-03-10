import constant from '../constant/constant';
import CollectionMixin from '../mixin/collection.mixin';
import { GroupJSON } from '../types/types';
import { extendsValue } from '../util/util';
import Sprite from './sprite';

class Group extends CollectionMixin(Sprite) {
  constructor(props: GroupJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_GROUP;
    this.fromJSON(props);
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

  group(items: Array<Sprite>): void {}

  ungroup() {}
}

export default Group;
