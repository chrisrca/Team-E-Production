import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "whitespace-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "appearance-none h-full w-full border rounded bg-white text-primary-foreground hover:bg-primary/90",
        login:
          "flex h-10 w-full bg-gray-200 focus:bg-white placeholder:text-grey-400 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50",
        form: "appearance-none border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        flowers:
          "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        dynamic:
          "appearance-none block w-fit h-min bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
FormInput.displayName = "FormInput";

export default FormInput;
