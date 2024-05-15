import * as React from "react";
import { test, assertType } from "vitest";
import { plug, outlet, OutletStatus } from "../index";
import type {
  Plug,
  PlugProps,
  PrimaryPlug,
  LockedIn,
  PlugForwardedRef,
} from "../index";
import type { DistributiveOmit } from "../types/helper.types";

type IconPlugProps = PlugProps<"span", "div"> & {
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

const Button = React.forwardRef<PlugForwardedRef<ButtonProps>, ButtonProps>(
  (props, ref) => {
    const {
      icon = OutletStatus.UnPlugged,
      content = OutletStatus.PluggedIn,
      children,
      ...rest
    } = props;
    const iconPosition = plug.resolve(icon)?.position ?? "before";

    const Root = outlet.lockedIn<"button", "a" | "div">("button", {
      ...rest,
      ref,
    });

    const Icon = outlet<"span", "div">(
      "span",
      plug.adapt(icon, ({ position, ...rest }) => rest)
    );

    const Content = outlet.lockedIn("div", content);

    return (
      <Root>
        {iconPosition === "before" && <Icon />}
        <Content>{children}</Content>
        {iconPosition === "after" && <Icon />}
      </Root>
    );
  }
);

test("Button", () => {
  assertType(
    <Button
      onClick={(ev) => ev.preventDefault()}
      icon={{
        children: <i>this is</i>,
        position: "after",
      }}
    />
  );
  assertType(<Button as="a" />);
  assertType(<Button as="div" />);
  //@ts-expect-error - it should not  support span
  assertType(<Button as="span" />);
});
