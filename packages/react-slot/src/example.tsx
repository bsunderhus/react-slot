import * as React from "react";
import type { ComponentProps, Slot, NoSignal } from "./types";
import { forwardRef } from "./forwardRef";
import { slot } from "./slot";
import { SlotSignal } from "./signal";
import { resolveShorthand } from ".";

type ButtonProps = ComponentProps<"button", "a"> & {
  icon?: Slot<"i", "span">;
  image?: Slot<"img">;
  wrapper?: NoSignal<Slot<"div">>;
};

export const Button = forwardRef<ButtonProps>((props, ref) => {
  const {
    icon = SlotSignal.Create,
    image = SlotSignal.Remove,
    wrapper = SlotSignal.Create,
    ...rest
  } = props;

  const Root = slot("button", rest, { ref });

  const Wrapper = slot("div", wrapper);

  const Icon = slot("i", icon, { children: "someIcon" });

  const Image = slot("img", image);

  return (
    <Root>
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
/>;
// @ts-expect-error
<Button onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error
<Button onClick={handleClickCustom} ref={divRef} />;

<Button as="button" onClick={handleClickButton} ref={buttonRef} />;
// @ts-expect-error
<Button as="button" onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error
<Button as="button" onClick={handleClickCustom} ref={divRef} />;

<Button as="a" onClick={handleClickAnchor} ref={aRef} />;
// @ts-expect-error
<Button as="a" onClick={handleClickButton} ref={buttonRef} />;
// @ts-expect-error
<Button as="a" onClick={handleClickCustom} ref={divRef} />;
