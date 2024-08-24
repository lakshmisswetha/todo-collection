import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Collection } from "../../contexts/types";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    collection: Collection;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ collection, className, ...props }, ref) => {
        const navigate = useNavigate();

        const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            navigate("/todo", { state: { id: collection.id } });
        };

        return (
            <div
                ref={ref}
                onClick={handleClick}
                className={cn(
                    "w-auto lg:w-[200px] rounded-xl border hover:bg-muted cursor-pointer  text-card-foreground shadow",
                    className
                )}
                {...props}
                data-title={collection.title}
            />
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
