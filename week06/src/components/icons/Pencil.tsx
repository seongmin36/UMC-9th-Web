import type { SVGProps } from "react";

export const Pencil = ({
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
        d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.33825 18.5 6.50982L17.4902 5.5C16.6618 4.67157 15.3284 4.67157 14.5 5.5L4 16V20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5L17.5 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
