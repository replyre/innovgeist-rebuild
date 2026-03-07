import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24", className)}>
      {children}
    </Component>
  );
}
