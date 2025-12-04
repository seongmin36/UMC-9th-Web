import type { SVGProps } from "react";

export const HeartIcon = ({
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
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.1 4.21L12 4.3L11.9 4.21C10.17 2.72 7.48 2.79 5.83 4.44C4.17 6.1 4.1 8.78 5.6 10.51L11.07 16.62C11.59 17.19 12.41 17.19 12.93 16.62L18.4 10.51C19.9 8.78 19.83 6.1 18.17 4.44C16.52 2.79 13.83 2.72 12.1 4.21Z" />
    </svg>
  );
};
