import { UnknownSlotProps } from ".";
import { SlotShorthandValue, UnknownSlotRenderFunction } from "./types";

const SlotCreateSignal = Symbol();

const SlotRemoveSignal = Symbol();

export type SlotSignal = SlotSignal.Create | SlotSignal.Remove;
export const SlotSignal = {
  Create: SlotCreateSignal,
  Remove: SlotRemoveSignal,
  from: (
    value:
      | UnknownSlotProps
      | UnknownSlotRenderFunction
      | SlotShorthandValue
      | SlotSignal
  ): SlotSignal =>
    value === SlotRemoveSignal ? SlotRemoveSignal : SlotCreateSignal,
  is: (signal: unknown): signal is SlotSignal =>
    signal === SlotSignal.Create || signal === SlotSignal.Remove,
} as const;
export namespace SlotSignal {
  export type Create = typeof SlotCreateSignal;
  export type Remove = typeof SlotRemoveSignal;
}
