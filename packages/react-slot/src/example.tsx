import * as React from "react";
import { Plug, PlugProps } from "./types";
import { forwardRef } from "./forwardRef";
import { outlet } from "./outlet";
import { type LockedIn, OutletStatus } from "./OutletStatus";

type ButtonProps = PlugProps<"button", "a"> & {
  icon?: Plug<"i", "span">;
  image?: Plug<"img">;
  wrapper?: LockedIn<Plug<"div">>;
};

export const Button = forwardRef<ButtonProps>((props, ref) => {
  const {
    icon = OutletStatus.PluggedIn,
    image = OutletStatus.UnPlugged,
    wrapper = OutletStatus.PluggedIn,
    ...rest
  } = props;

  const Root = outlet.lockedIn("button", rest);

  const Wrapper = outlet.lockedIn("div", wrapper);

  const Icon = outlet("i", icon, {
    children: "someIcon",
  });

  const Image = outlet("img", image);

  return (
    <Root ref={ref}>
      <Icon />
      <Image />
      <Wrapper>{Root.props.children}</Wrapper>
    </Root>
  );
});

const buttonRef = React.createRef<HTMLButtonElement>();
const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = (
  ev
) => {};
const aRef = React.createRef<HTMLAnchorElement>();
const handleClickAnchor: React.MouseEventHandler<HTMLAnchorElement> = (
  ev
) => {};
const divRef = React.createRef<HTMLDivElement>();
const handleClickCustom = (s: string) => {};

<Button
  icon={{ ref: buttonRef }}
  onClick={handleClickButton}
  ref={buttonRef}
  // @ts-expect-error - wrapper cannot be unplugged
  wrapper={unPluggedStatusSymbol}
/>;
// @ts-expect-error - requires a button handler
<Button onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error - requires a button handler
<Button onClick={handleClickCustom} ref={divRef} />;

<Button as="button" onClick={handleClickButton} ref={buttonRef} />;
// @ts-expect-error - requires a button handler
<Button as="button" onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error - requires a button handler
<Button as="button" onClick={handleClickCustom} ref={divRef} />;

<Button as="a" onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error - requires an anchor handler
<Button as="a" onClick={handleClickButton} ref={buttonRef} />;
// @ts-expect-error - requires an anchor handler
<Button as="a" onClick={handleClickCustom} ref={divRef} />;
