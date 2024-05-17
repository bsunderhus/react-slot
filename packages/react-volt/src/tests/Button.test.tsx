import * as React from "react";
import { test, assertType } from "vitest";
import { OutletStatus, isPlugProps, outlet, plug, union } from "../index";
import type {
  Plug,
  PlugProps,
  PrimaryPlug,
  LockedIn,
  PlugRefElement,
  OutletTypeDataType,
} from "../index";
import type {
  DistributiveOmit,
  HTMLElements,
  HTMLElementsProps,
} from "../types/helper.types";

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

const Button = React.forwardRef<PlugRefElement<ButtonProps>, ButtonProps>(
  (props, ref) => {
    const {
      icon = OutletStatus.UnPlugged,
      content = OutletStatus.PluggedIn,
      children,
      ...rest
    } = props;
    const onClick = union.ensureEventHandlerType(props.onClick);

    const iconPosition =
      (isPlugProps<IconPlugProps>(icon) && icon.position) || "before";

    const Root = outlet.lockedIn<"button", "a" | "div">("button", {
      ...rest,
      ref: union.ensureRefType(ref),
      onClick: (event: React.MouseEvent<PlugRefElement<ButtonProps>>) => {
        // @ts-expect-error - we should verify that event.currentTarget is an anchor
        event.currentTarget.href;
        onClick?.(event);
      },
    });

    const iconRef: React.RefCallback<PlugRefElement<IconPlugProps>> = (
      element
    ) => null;

    const Icon = outlet<"span", "div">(
      "span",
      plug.adapt(icon, ({ position, ...rest }) => ({
        ...rest,
        ref: iconRef,
      }))
    );

    const Content = outlet.lockedIn<"div">("div", content);

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
        onClick: (event) => event.preventDefault(),
      }}
    />
  );
  assertType(<Button as="a" />);
  assertType(<Button as="div" />);
  //@ts-expect-error - it should not  support span
  assertType(<Button as="span" />);
});
