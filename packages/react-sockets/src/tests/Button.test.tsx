import * as React from "react";
import { test, assertType } from "vitest";
import { plug, socket, Plug, PlugProps, PrimaryPlug, LockedIn } from "../index";
import { DistributiveOmit } from "../types/helper.types";

type IconPlugProps = PlugProps<"span"> & {
  /**
   * The position on which the icon will be, relative to children
   *
   * @default "before"
   */
  position?: "before" | "after";
};

type ButtonProps = DistributiveOmit<
  PrimaryPlug<"button", "a" | "div">,
  "content"
> & {
  icon?: Plug<IconPlugProps>;
  content?: LockedIn<Plug<"div">>;
};

const Button = (props: ButtonProps) => {
  const { icon, content, children, ...rest } = props;
  const iconPosition = plug.resolve(icon)?.position ?? "before";
  const Root = socket.lockedIn<"button", "a" | "div">("button", rest);
  const Icon = socket(
    "span",
    plug.adapter(icon, ({ position, ...rest }) => rest),
    { children: "some icon" }
  );
  const Content = socket.lockedIn("div", content);
  return (
    <Root>
      {iconPosition === "before" && <Icon />}
      <Content>{children}</Content>
      {iconPosition === "after" && <Icon />}
    </Root>
  );
};

test("Button", () => {
  assertType(
    <Button
      as="button"
      content={{ onClick: (ev) => null }}
      icon={{ children: <i>this is</i>, position: "after" }}
    />
  );
  assertType(<Button as="a" />);
  assertType(<Button as="div" />);
  //@ts-expect-error - it should not  support span
  assertType(<Button as="span" />);
});
