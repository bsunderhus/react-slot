import * as React from "react";
import type { LockedIn, Slot } from "./types";
import { forwardRef } from "./forwardRef";
import { createSlot } from "./createSlot";
import { UnPlugged } from "./constants";

type ButtonProps = Slot.Main<"button", "a"> & {
  icon?: Slot<"i", "span">;
  image?: Slot<"img">;
  wrapper?: LockedIn<Slot<"div">>;
};

export const Button = forwardRef<ButtonProps>((props, ref) => {
  const { icon, image, wrapper, ...rest } = props;

  const Root = createSlot("button", rest);

  const Wrapper = createSlot("div", wrapper);

  const Icon = createSlot("i", icon, { children: "someIcon" });

  const Image = createSlot("img", image ?? UnPlugged);

  return (
    <Root ref={ref}>
      <Icon />
      <Image />
      <Wrapper>{Root.children}</Wrapper>
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
  wrapper={UnPlugged}
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
