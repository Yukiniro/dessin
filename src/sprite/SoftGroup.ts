import constant from '../constant/constant';
import { GroupJSON } from '../types/types';
import Group from './Group';

class SoftGroup extends Group {
  constructor(props: GroupJSON = {}) {
    super(props);
    this._type = constant.SPRITE_TYPE_SOFTGROUP;
  }
}

export default SoftGroup;
