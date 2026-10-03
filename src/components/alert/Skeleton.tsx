import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className = "", ...props }: SkeletonProps) => (
  <div
    className={`animate-pulse rounded bg-gray-200 ${className}`}
    {...props}
  />
);

type SkeletonTextProps = {
  lines?: number;
  className?: string;
};

export const SkeletonText = ({
  lines = 3,
  className = "",
}: SkeletonTextProps) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
      />
    ))}
  </div>
);
