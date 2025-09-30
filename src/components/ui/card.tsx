import * as React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "tinted" | "soft" | "outline";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Estilo visual del card (default = como ahora) */
  variant?: CardVariant;
  /** Hover + focus bonitos para tarjetas clicables */
  interactive?: boolean;
  /** Anillo de selección (p.ej., servicios seleccionados) */
  selected?: boolean;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      interactive = false,
      selected = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-variant={variant}
      className={cn(
        "rounded-2xl border text-card-foreground", // base
        // variantes
        variant === "default" && "bg-card shadow-sm",
        variant === "tinted" &&
          "bg-gradient-to-br from-primary/10 to-transparent border-primary/10 shadow-sm",
        variant === "soft" && "bg-muted/30 border-border/60 shadow-sm",
        variant === "outline" && "bg-background border-border",
        // interacción
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        // seleccionado
        selected && "ring-2 ring-primary/30",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // Ajusta el tamaño en cada uso con className si quieres más compacto: "text-lg"
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  // Añade "line-clamp-2" en tus usos para truncar descripciones largas
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
