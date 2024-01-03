type SpacerProps = {
  x?: number;
  y?: number;
  h?: number;
  w?: number;
  children?: React.ReactNode | React.ReactNode[];
};
export default function Spacer({
  x = 0,
  y = 0,
  h = 0,
  w = 0,
  children,
}: SpacerProps) {
  const spacerStyle = {
    width: `${w}px`,
    height: `${h}px`,
    margin: `${y}px ${x}px`,
  };
  return <div style={spacerStyle}>{children}</div>;
}
