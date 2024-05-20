import * as React from "react";
import { test, assertType } from "vitest";
import { PlugStatus, isPlugProps, outlet, plug, union } from "../index";
import type { Plug, PlugProps, LockedIn, PlugRefElement } from "../index";
import type { DistributiveOmit } from "../types/helper.types";
import type { Adapter, Primary } from "../types/plug.types";

type IconPlugProps = PlugProps<"span?" | "div"> & {
  /**
   * The position on which the icon will be, relative to children
   *
   * @default "before"
   */
  position?: "before" | "after";
};

type ButtonProps = DistributiveOmit<
  Primary<Plug<"button?" | "a" | "div">>,
  "content"
> & {
  icon?: Plug<IconPlugProps>;
  content?: LockedIn<Plug<"div?">>;
};

const Button = React.forwardRef<PlugRefElement<ButtonProps>, ButtonProps>(
  (props, ref) => {
    const {
      icon = PlugStatus.UnPlugged,
      content = PlugStatus.PluggedIn,
      children,
      ...rest
    } = props;

    const iconPosition =
      (isPlugProps<IconPlugProps>(icon) && icon.position) || "before";

    const iconRef: React.RefCallback<PlugRefElement<IconPlugProps>> = (
      element
    ) => null;

    const outlets = {
      root: outlet.lockedIn<"button" | "a" | "div">("button", {
        ...rest,
        ref: union.ensureRefType(ref),
        onClick: (event: React.MouseEvent<PlugRefElement<ButtonProps>>) => {
          // @ts-expect-error - we should verify that event.currentTarget is an anchor
          event.currentTarget.href;
          if (event.currentTarget instanceof HTMLAnchorElement) {
            event.currentTarget.href;
          }
          union.assertEventType(event);
          props.onClick?.(event);
        },
      }),
      icon: outlet<"span" | "div">(
        "span",
        plug.adapt(icon, ({ position, ...rest }) => ({
          ...rest,
          ref: iconRef,
        }))
      ),
      content: outlet.lockedIn<"div">("div", content),
    };

    return (
      <outlets.root>
        {outlets.icon && iconPosition === "before" && <outlets.icon />}
        <outlets.content>{children}</outlets.content>
        {outlets.icon && iconPosition === "after" && <outlets.icon />}
      </outlets.root>
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
        //@ts-expect-error - event will be any
        onClick: (event) => event.preventDefault(),
      }}
    />
  );
  assertType(<Button as="a" href="anchor value" />);
  assertType(<Button as="div" />);
  //@ts-expect-error - it should not  support span
  assertType(<Button as="span" />);
});
