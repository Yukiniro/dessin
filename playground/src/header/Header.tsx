import { Button, Divider, IconButton } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';

interface HeaderProps {
  addRect: () => void;
  addCircle: () => void;
  addText: () => void;
  exportImage: () => void;
}

function Header(props: HeaderProps) {
  const { addRect, addCircle, addText, exportImage } = props;
  return (
    <div className="flex items-center justify-between w-full shadow">
      <div className="flex items-center justify-between">
        <Button className="text-dark-50 mx-4" href="https://github.com/Yukiniro/dessin">
          Dessin
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button className="mx-2" variant="contained" onClick={addRect}>
          Add Rect
        </Button>
        <Button className="mx-2" variant="contained" onClick={addCircle}>
          Add Circle
        </Button>
        <Button className="mx-2" variant="contained" onClick={addText}>
          Add Text
        </Button>
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
