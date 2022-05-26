import { Button, Divider, IconButton } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import useStore from '../store/index';
import { ChangeEvent, useCallback } from 'react';

interface HeaderProps {
  exportImage: () => void;
}

function Header(props: HeaderProps) {
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
      </div>
      <div>
        <IconButton onClick={exportImage} color="success">
          <CloudDownload />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
