import type { SVGProps } from "react";

export const Kebab = ({
  color = "currentColor",
  ...props
}: SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill={color}>
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </g>
    </svg>
  );
};

export default Kebab;
