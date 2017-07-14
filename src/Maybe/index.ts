import * as Z from "sanctuary-type-classes";
import * as F from "fantasy-types";
import Nothing, { isNothing } from "./Nothing";
import Just, { isJust } from "./Just";

export interface Maybe<T> extends F.Ord, F.Monoid, F.Monad<T>, F.Alternative<
  T
>, F.Traversable<T>, F.Extend<T> {
  __value?: T;
}

export interface MaybeConstructor extends F.ApplicativeConstructor, F.MonoidConstructor, F.PlusConstructor {}

export const fromMaybe = <T>(initial: T, m: Maybe<T>): T =>
  isNothing(m) ? initial : m.__value;

// TODO: check on null as well
export const toMaybe = <T>(v?: T): Maybe<T> =>
  typeof v === "undefined" ? new Nothing() : new Just<T>(v);

// The same as reduce?
export const maybe = <T, T1>(initial: T, f: (a: T) => T1, m: Maybe<T>): T1 =>
  f(fromMaybe<T>(initial, m));

export { default as Just, isJust } from "./Just";
export { default as Nothing, isNothing } from "./Nothing";
