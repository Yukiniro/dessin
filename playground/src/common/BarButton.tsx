import { Button } from '@nextui-org/react';
import { MouseEvent, MouseEventHandler, ReactNode, useCallback, useMemo } from 'react';
import classNames from 'classnames';

interface BarButtonProps {
  text?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  disabled?: boolean;
}

function BarButton(props: BarButtonProps) {
  const { icon, onClick, active, disabled, text } = props;
  const className = useMemo(() => {
    const baseClass = 'min-w-8 min-h-8 mx-1 bg-transparent text-black hover:bg-gray-200';
    return classNames(baseClass, disabled && 'opacity-65', active ? 'bg-gray-200' : '');
  }, [active, disabled]);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
        event.currentTarget.blur();
      }
    },
    [onClick]
  );
  return (
    <Button onClick={handleClick} disabled={disabled} className={className} size="xs" icon={icon}>
      {text}
    </Button>
  );
}

export default BarButton;
