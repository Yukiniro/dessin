import { Button } from '@nextui-org/react';
import { MouseEvent, MouseEventHandler, ReactNode, useCallback, useMemo } from 'react';
import classNames from 'classnames';

interface BarButtonProps {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

function BarButton(props: BarButtonProps) {
  const { icon, onClick, active } = props;
  const className = useMemo(() => {
    const baseClass = 'min-w-8 min-h-8 w-8 h-8 mx-1 bg-transparent fill-black hover:bg-gray-200';
    return classNames(baseClass, active ? 'bg-gray-200' : '');
  }, [active]);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
        event.currentTarget.blur();
      }
    },
    [onClick]
  );
  return <Button onClick={handleClick} className={className} size="xs" icon={icon} />;
}

export default BarButton;
