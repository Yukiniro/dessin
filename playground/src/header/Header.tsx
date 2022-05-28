import { Button, Divider, IconButton } from '@mui/material';
import useStore from '../store/index';
import { ChangeEvent, useCallback } from 'react';
import RectangleIcon from '../icon/rectangle.svg?component';
import HandIcon from '../icon/hand.svg?component';
import CircleIcon from '../icon/circle.svg?component';
import DownloadIcon from '../icon/download.svg?component';

interface HeaderProps {
  exportImage: () => void;
}

function Header(props: HeaderProps): JSX.Element {
  const { exportImage } = props;
  const { changeBackgroundColor, backgroundColor } = useStore((state) => state);
  const onColorChange = useCallback(
    (event: ChangeEvent) => {
      changeBackgroundColor((event.target as HTMLInputElement).value);
    },
    [changeBackgroundColor]
  );

  return (
    <div className="flex items-center justify-between w-full shadow">
      <div className="flex items-center justify-between">
        <Button className="text-dark-50 mx-4" href="https://github.com/Yukiniro/dessin">
          Dessin
        </Button>
        <Divider orientation="vertical" flexItem />
        <input onChange={onColorChange} value={backgroundColor} className="mx-2" type="color" />
        <IconButton>
          <HandIcon width="24" height="24" />
        </IconButton>
        <IconButton>
          <RectangleIcon width="22" height="22" />
        </IconButton>
        <IconButton>
          <CircleIcon width="24" height="24" />
        </IconButton>
      </div>
      <div>
        <IconButton onClick={exportImage}>
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
