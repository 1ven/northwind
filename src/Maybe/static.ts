import Nothing from "./Nothing";
import Just from "./Just";

export const empty = () => new Nothing();

export const zero = () => new Nothing();

export const of = <T>(value: T) => new Just(value);
