import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  trigger?: 'click' | 'hover';
  className?: string;
}

const Popover: FC<PopoverProps> = ({
  children,
  content,
  trigger = 'click',
  className,
}) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = () => {
    if (trigger === 'hover') {
      setShow(true);
    }
  };

  const handleMouseLeft = () => {
    if (trigger === 'hover') {
      setShow(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-fit h-fit absolute bottom-[100%] z-50 transition-all"
      >
        <div
          className={`rounded-full bg-white border p-3 shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[9px] ml-16 ${
            className ? className : ''
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popover;
