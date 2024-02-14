import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

interface Test<P = object> {
  (props: P): React.ReactNode;
}

export type ButtonProps<Type> =
  | ({ as?: "button" } & React.JSX.IntrinsicElements["button"])
  | ({ as: "a" } & React.JSX.IntrinsicElements["a"])
  | Type extends typeof CustomButton
  ? 1
  : 2;

export const Button = <Props,>(props: ButtonProps<Props>) => {
  return null;
};

type CustomProps = { onClick?: (ev: string) => void };

const CustomButton = React.forwardRef(
  (props: CustomProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <button ref={ref} onClick={() => props.onClick?.("clicked")}>
      Custom Button
    </button>
  )
);
type X = ButtonProps<typeof CustomButton>;

// const x = <Button as={CustomButton} onClick={(ev) => ev} ref={null} />;
