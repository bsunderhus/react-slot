/**
 * Helper type that is equivalent to `never`
 * but it's more descriptive.
 */
export type Never<Msg extends string> = Msg & never;
