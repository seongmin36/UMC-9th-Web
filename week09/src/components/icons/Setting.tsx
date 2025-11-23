import type { SVGProps } from "react";

export const SettingIcon = ({
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
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      {...props}
    >
      <path
        d="M10.325 4.317c.4-1.532 2.65-1.532 3.05 0a1.724 1.724 0 0 0 2.573 1.046c1.357-.783 2.932.792 2.149 2.149a1.724 1.724 0 0 0 1.046 2.573c1.532.4 1.532 2.65 0 3.05a1.724 1.724 0 0 0-1.046 2.573c.783 1.357-.792 2.932-2.149 2.149a1.724 1.724 0 0 0-2.573 1.046c-.4 1.532-2.65 1.532-3.05 0a1.724 1.724 0 0 0-2.573-1.046c-1.357.783-2.932-.792-2.149-2.149a1.724 1.724 0 0 0-1.046-2.573c-1.532-.4-1.532-2.65 0-3.05a1.724 1.724 0 0 0 1.046-2.573c-.783-1.357.792-2.932 2.149-2.149.9.52 2.05.114 2.573-1.046Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" />
    </svg>
  );
};
