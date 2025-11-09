import type { SVGProps } from "react";

export const Trash = ({
  color = "currentColor",
  width = 24,
  height = 24,
  ...props
}: {
  color?: string;
  width?: number;
  height?: number;
} & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      {...props}
    >
      <path
        d="M5 7H19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 4H14C14.5523 4 15 4.44772 15 5V7H9V5C9 4.44772 9.44772 4 10 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 7V18C8 19.1046 8.89543 20 10 20H14C15.1046 20 16 19.1046 16 18V7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 10V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 10V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};
