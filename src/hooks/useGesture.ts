import { useRef } from "react";

const initialGesturePosition = {
  xDown: 0,
  yDown: 0,
  xUp: 0,
  yUp: 0,
  timerStart: 0,
  timerEnd: 0,
};

type UseGestureProps = {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
};
export default function useGesture({
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
}: UseGestureProps) {
  const geturePosition = useRef(initialGesturePosition);

  function resetGesture() {
    geturePosition.current = initialGesturePosition;
  }

  function handleGesture() {
    const { xDown, yDown, xUp, yUp, timerStart, timerEnd } =
      geturePosition.current;
    if (!xDown || !yDown || !xUp || !yUp || !timerStart || !timerEnd) return;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    const timeDiff = timerEnd - timerStart;

    // Double tap logic
    if (timeDiff > 400) {
      onLongPress && onLongPress();
      resetGesture();
      return;
    }

    // Swipe logic
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
    resetGesture();
  }

  function onTouchStart(event: any) {
    geturePosition.current.xDown = event.touches[0].clientX;
    geturePosition.current.yDown = event.touches[0].clientY;
    geturePosition.current.timerStart = new Date().getTime();
    handleGesture();
  }

  function onTouchEnd(event: any) {
    geturePosition.current.xUp = event.changedTouches[0].clientX;
    geturePosition.current.yUp = event.changedTouches[0].clientY;
    geturePosition.current.timerEnd = new Date().getTime();
    handleGesture();
  }

  return {
    onTouchStart,
    onTouchEnd,
  };
}
