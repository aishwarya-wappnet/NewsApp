import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./style.module.css";
import styled from "styled-components";

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

export const EditButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const ClearButton = styled(EditButton)`
  background-color: #ef4444;

  &:hover {
    background-color: #dc2626;
  }
`;

const _Button = Object.assign(Button, {
  Variants: Options.Variant,
  Secondary: SecondaryButton,
});

export default _Button;
