import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface HeaderProps {
  addRect: () => void;
  addCircle: () => void;
  addText: () => void;
  exportImage: () => void;
}

function Header(props: HeaderProps) {
  const { addRect, addCircle, addText, exportImage } = props;
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <ButtonGroup>
          <Button onClick={addRect}>Add Rect</Button>
          <Button onClick={addCircle}>Add Circle</Button>
          <Button onClick={addText}>Add Text</Button>
        </ButtonGroup>
      </div>
      <div>
        <Button onClick={exportImage}>export</Button>
      </div>
    </div>
  );
}

export default Header;
