import useStore from '../../store/index';
import { ChangeEvent, useCallback, useEffect } from 'react';
import RectangleIcon from '../../icon/rectangle.svg?component';
import HandIcon from '../../icon/hand.svg?component';
import CircleIcon from '../../icon/circle.svg?component';
import DownloadIcon from '../../icon/download.svg?component';
import DeleteIcon from '../../icon/delete.svg?component';
import { Link, Spacer } from '@nextui-org/react';
import BarButton from '../../common/BarButton';
import { subscribe } from 'toukey';

interface HeaderProps {
  exportImage: () => void;
}

function Header(props: HeaderProps): JSX.Element {
  const { exportImage } = props;
  const {
    groupDisabled,
    groupType,
    toggleGroup,
    operateType,
    changeOperateType,
    changeBackgroundColor,
    backgroundColor,
    deleteDisabled,
    deleteSprite,
  } = useStore((state) => state);
  const onColorChange = useCallback(
    (event: ChangeEvent) => {
      changeBackgroundColor((event.target as HTMLInputElement).value);
    },
    [changeBackgroundColor]
  );

  useEffect(() => {
    return subscribe('delete', () => {
      if (!deleteDisabled) {
        deleteSprite();
      }
    });
  }, [deleteDisabled, deleteSprite]);

  useEffect(() => {
    return subscribe('space', () => {
      changeOperateType('handle');
    });
  }, [changeOperateType]);

  const changeHandleType = useCallback(() => {
    changeOperateType('handle');
  }, [changeOperateType]);
  const changeRectType = useCallback(() => {
    changeOperateType('rect');
  }, [changeOperateType]);
  const changeCircleType = useCallback(() => {
    changeOperateType('circle');
  }, [changeOperateType]);

  return (
    <div className="flex items-center justify-between w-full shadow h-10">
      <div className="flex items-center justify-between">
        <Link className="mx-4" href="https://github.com/Yukiniro/dessin">
          Dessin
        </Link>
        <Spacer x={1} />
        <input onChange={onColorChange} value={backgroundColor} className="mx-2" type="color" />
        <BarButton
          onClick={changeHandleType}
          active={operateType === 'handle'}
          icon={<HandIcon width={24} height={24} />}
        />
        <BarButton
          onClick={changeRectType}
          active={operateType === 'rect'}
          icon={<RectangleIcon width={20} height={20} />}
        />
        <BarButton
          onClick={changeCircleType}
          active={operateType === 'circle'}
          icon={<CircleIcon width={26} height={26} />}
        />
        <BarButton
          onClick={toggleGroup}
          disabled={groupDisabled}
          text={groupType === 'group' ? 'Group' : 'Ungroup'}
        />
        <BarButton
          onClick={deleteSprite}
          disabled={deleteDisabled}
          icon={<DeleteIcon width={26} height={26} />}
        />
      </div>
      <div>
        <BarButton icon={<DownloadIcon />} onClick={exportImage} />
      </div>
    </div>
  );
}

export default Header;
