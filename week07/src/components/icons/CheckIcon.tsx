import type { SVGProps } from "react";

export const CheckIcon = ({
  color = "currentColor",
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M5 13L9.5 17.5L19 6.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
