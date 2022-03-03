import CollectionMixin from '../mixin/collection.mixin';
import { GroupJSON } from '../types/types';
import { extendsValue } from '../util/util';
import Sprite from './sprite';

class Group extends CollectionMixin(Sprite) {
  protected _isTemporary: boolean = false;

  constructor(props: GroupJSON) {
    super(props);
    this.fromJSON(props);
  }

  fromJSON(data: GroupJSON): this {
    super.fromJSON(data);
    extendsValue.call(this, 'isTemporary', data.isTemporary, false);
    extendsValue.call(this, 'items', data.items, []);
    return this;
  }

  toJSON(): GroupJSON {
    return {
      ...super.toJSON(),
      isTemporary: this._isTemporary,
      items: this.mapItem((item) => item.toJSON()),
    };
  }

  get isTemporary(): boolean {
    return this._isTemporary;
  }

  set isTemporary(value: boolean) {
    this._isTemporary = value;
  }

  group(items: Array<Sprite>): void {

  }

  ungroup() {

  }
}

export default Group;
