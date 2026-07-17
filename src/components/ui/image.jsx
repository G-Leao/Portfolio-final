import * as React from "react";
import { cn } from "../../lib/utils";

const Image = React.forwardRef(
  ({ className, fallback, alt, src, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    if (imgError && fallback) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center bg-muted text-muted-foreground",
            className,
          )}
          {...props}
        >
          {typeof fallback === "function" ? fallback() : fallback}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("object-cover", className)}
        onError={() => setImgError(true)}
        {...props}
      />
    );
  },
);
Image.displayName = "Image";

export { Image };
