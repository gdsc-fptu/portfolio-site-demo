type UseKeyboardProps = {
  onEnter?: () => void;
  onLeftArrow?: () => void;
  onRightArrow?: () => void;
};
export default function useKeyboard({
  onEnter,
  onLeftArrow,
  onRightArrow,
}: UseKeyboardProps) {
  function onKeyPress(event: any) {
    switch (event.key) {
      case "Enter":
        onEnter && onEnter();
        break;
      case "ArrowLeft":
        onLeftArrow && onLeftArrow();
        break;
      case "ArrowRight":
        onRightArrow && onRightArrow();
        break;
      default:
        break;
    }
  }

  return {
    onKeyPress,
  };
}
