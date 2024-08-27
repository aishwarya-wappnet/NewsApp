import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./style.module.css";

enum Variant {
  Primary,
  Secondary,
  Lined,
}

export const Options = { Variant };

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: Variant;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.button,
          styles.primary,
          {
            [styles.secondary]: variant === Options.Variant.Secondary,
          },
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={classNames(styles.secondary, className)}
      {...props}
    />
  )
);

SecondaryButton.displayName = "SecondaryButton";

const _Button = Object.assign(Button, {
  Variants: Options.Variant,
  Secondary: SecondaryButton,
});

export default _Button;
