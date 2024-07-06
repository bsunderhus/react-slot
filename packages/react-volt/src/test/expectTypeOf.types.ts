import type { IsNever } from "../types/helper.types";
import type { Stringify } from "./stringify.types";

/** @public */
export interface ExpectTypeOf<Expected, ExpectedLabel extends string> {
  /**
   * Type equivalence stands for these conditions between the {@link Expected} and {@link Target} types being matched:
   *
   * 1. The {@link Expected} type extends the {@link Target} type.
   *    * This would be a similar kind of assertion that TS would do to ensure one type is assignable to another.
   * 2. The {@link Expected} type doesn't have any extra properties compared to the {@link Target} type.
   */
  toEquivalentTypeOf<
    Target extends E extends true ? unknown : E,
    const TargetLabel extends string = "Target",
    E = Equivalent<Expected, Target, ExpectedLabel, TargetLabel>
  >(
    target?: Target,
    targetLabel?: TargetLabel
  ): void;
}

/**
 * @public
 *
 * A type asserter that can be used to ensure equivalence between two types.
 */
export type Equivalent<
  Expected,
  Target,
  ExpectedLabel extends string = "Expected",
  TargetLabel extends string = "Target"
> = Extends<Expected, Target> extends true
  ? IsNever<
      Exclude<keyof NonNullable<Expected>, keyof NonNullable<Target>>
    > extends true
    ? true
    : EquivalenceError<`${ExpectedLabel} has unknown properties: ${Stringify<
        Exclude<keyof NonNullable<Expected>, keyof NonNullable<Target>>
      >}`>
  : // TODO: improve error message
    EquivalenceError<`${ExpectedLabel} does not extend ${TargetLabel}`>;

type Extends<Left, Right> = IsNever<Left> extends true
  ? IsNever<Right>
  : [Left] extends [Right]
  ? true
  : false;

declare const _$EquivalenceError: unique symbol;
type EquivalenceError<Err extends string> = Err | typeof _$EquivalenceError;
