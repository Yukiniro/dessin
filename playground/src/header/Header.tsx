import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <ButtonGroup>
          <Button>Undo</Button>
          <Button>Redo</Button>
        </ButtonGroup>
      </div>
      <div>
        <Button>export</Button>
      </div>
    </div>
  );
}

export default Header;
