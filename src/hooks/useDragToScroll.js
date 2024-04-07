import { useRef, useEffect } from 'react';

const useDragToScroll = (ref) => {
  const startPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const handleDragStart = (e) => {
      if (e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
      }
    };

    const handlePointerDown = (e) => {
      startPos.current = { x: e.pageX, y: e.pageY };
      isDragging.current = true;
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.pageX - startPos.current.x;
      const dy = e.pageY - startPos.current.y;
      ref.current.scrollLeft -= dx;
      ref.current.scrollTop -= dy;
      startPos.current = { x: e.pageX, y: e.pageY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    if (ref.current) {
      ref.current.addEventListener('dragstart', handleDragStart);
      ref.current.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('dragstart', handleDragStart);
        ref.current.removeEventListener('pointerdown', handlePointerDown);
      }
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [ref]);

  return ref;
};

export default useDragToScroll;