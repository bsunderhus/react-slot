import type * as ReactTypes from "./react.types";

export type SlotRenderFunction<Props> = (
  Component: React.ElementType<Props>,
  props: Omit<Props, "as">
) => ReactTypes.ReactNode;

export type WithoutSlotRenderFunction<Props> = Props extends unknown
  ? "children" extends keyof Props
    ? Omit<Props, "children"> & {
        children?: Exclude<Props["children"], Function>;
      }
    : Props
  : never;

export type WithSlotRenderFunction<Props> = "children" extends keyof Props
  ? Omit<Props, "children"> & {
      children?: SlotRenderFunction<Props> | Props["children"];
    }
  : Props & {
      children?: SlotRenderFunction<Props>;
    };
