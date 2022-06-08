import useStore from '../store/index';
import { ChangeEvent, useCallback } from 'react';
import RectangleIcon from '../icon/rectangle.svg?component';
import HandIcon from '../icon/hand.svg?component';
import CircleIcon from '../icon/circle.svg?component';
import DownloadIcon from '../icon/download.svg?component';
import { Button, Link, Spacer } from '@nextui-org/react';

interface HeaderProps {
  exportImage: () => void;
}

function Header(props: HeaderProps): JSX.Element {
  const { exportImage } = props;
  const { operateType, changeBackgroundColor, backgroundColor } = useStore((state) => state);
  const onColorChange = useCallback(
    (event: ChangeEvent) => {
      changeBackgroundColor((event.target as HTMLInputElement).value);
    },
    [changeBackgroundColor]
  );

  return (
    <div className="flex items-center justify-between w-full shadow">
      <div className="flex items-center justify-between">
        <Link className="mx-4" href="https://github.com/Yukiniro/dessin">
          Dessin
        </Link>
        <Spacer x={1} />
        <input onChange={onColorChange} value={backgroundColor} className="mx-2" type="color" />
        <Button size="sm" auto icon={<HandIcon />} />
        <Button size="sm" auto icon={<RectangleIcon />} />
        <Button size="sm" auto icon={<CircleIcon />} />
      </div>
      <div>
        <Button auto icon={<DownloadIcon />} onClick={exportImage} />
      </div>
    </div>
  );
}

export default Header;
