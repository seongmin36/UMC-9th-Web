import type { SVGProps } from "react";

export const Hamburger = ({
  color = "currentColor",
  width = 12,
  height = 12,
  ...props
}: SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M7.95 11.95h32m-32 12h32m-32 12h32"
      />
    </svg>
  );
};
