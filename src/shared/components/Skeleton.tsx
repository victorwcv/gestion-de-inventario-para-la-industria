import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
};

export function Skeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted-foreground/20",
        className
      )}
    />
  );
}