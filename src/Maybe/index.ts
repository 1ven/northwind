import * as F from "icecrown";
import Nothing, { isNothing } from "./Nothing";
import Just, { isJust } from "./Just";

export interface Maybe<T> extends F.Ord, F.Monoid, F.Monad<T>, F.Alternative<
  T
>, F.Traversable<T>, F.Extend<T> {
  __value?: T;
}

export interface MaybeConstructor extends F.MonadConstructor, F.MonoidConstructor, F.PlusConstructor {}

export const fromMaybe = <T>(initial: T, m: Maybe<T>): T =>
  isNothing(m) ? initial : m.__value;

export const toMaybe = <T>(v?: T): Maybe<T> =>
  typeof v === "undefined" || v === null ? new Nothing() : new Just(v);

export { default as Just, isJust } from "./Just";
export { default as Nothing, isNothing } from "./Nothing";
