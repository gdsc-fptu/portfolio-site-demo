import { useRef } from "react";

type UseGestureProps = {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};
export default function useGesture({
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
}: UseGestureProps) {
  const geturePosition = useRef({ xDown: 0, yDown: 0, xUp: 0, yUp: 0 });

  function handleGesture() {
    const { xDown, yDown, xUp, yUp } = geturePosition.current;
    if (!xDown || !yDown || !xUp || !yUp) return;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        onSwipeLeft && onSwipeLeft();
      } else {
        onSwipeRight && onSwipeRight();
      }
    } else {
      if (yDiff > 0) {
        onSwipeUp && onSwipeUp();
      } else {
        onSwipeDown && onSwipeDown();
      }
    }
    geturePosition.current = { xDown: 0, yDown: 0, xUp: 0, yUp: 0 };
  }

  function onTouchStart(event: any) {
    geturePosition.current.xDown = event.touches[0].clientX;
    geturePosition.current.yDown = event.touches[0].clientY;
    handleGesture();
  }

  function onTouchEnd(event: any) {
    geturePosition.current.xUp = event.changedTouches[0].clientX;
    geturePosition.current.yUp = event.changedTouches[0].clientY;
    handleGesture();
  }

  return {
    onTouchStart,
    onTouchEnd,
  };
}
