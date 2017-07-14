import * as Z from "sanctuary-type-classes";
import * as F from "fantasy-types";
import { Maybe, MaybeConstructor } from "./";
import { of, zero, empty } from "./static";
import Nothing, { isNothing } from "./Nothing";

interface Constructor extends MaybeConstructor {
  new <T>(__value?: T): Maybe<T>;
}

const Just = <Constructor>class Just<T> implements Maybe<T> {
  constructor(public __value?: T) {}

  static of = of;
  static zero = zero;
  static empty = empty;

  public equals(b: Maybe<T>) {
    return isJust(b) && Z.equals(this.__value, b.__value);
  }

  public lte(b: Maybe<T>) {
    return isJust(b) && Z.lte(this.__value, b.__value);
  }

  public concat(b: Maybe<T>) {
    return isNothing(b) ? this : new Just<T>(Z.concat(this.__value, b.__value));
  }

  public map<T1>(f: (a: T) => T1) {
    return new Just<T1>(f(this.__value));
  }

  public ap<T1>(b: Maybe<(x: T) => T1>) {
    // TODO: should use Z.map, like sanctuary does?
    return isNothing(b) ? new Nothing() : new Just<T1>(b.__value(this.__value));
  }

  public chain<T1>(f: (a: T) => Maybe<T1>) {
    return f(this.__value);
  }

  public alt<T1>(b: Maybe<T1>) {
    return this;
  }

  public reduce<T1>(f: (acc: T1, value: T) => T1, initial: T1) {
    return f(initial, this.__value);
  }

  public traverse(A: F.ApplicativeConstructor, f: (a: T) => F.Traversable<T>) {
    return f(this.__value).map(Just.of) as any;
  }

  public extend<T1>(f: (a: Maybe<T>) => T1) {
    return new Just(f(this));
  }
};

export const isJust = <T>(a: Maybe<T>): boolean => a instanceof Just;

export default Just;
