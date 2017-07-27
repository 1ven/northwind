import {
  ApplicativeConstructor,
  Applicative,
  Setoid,
  Semigroup,
  Ord,
  equals,
  lte,
  concat
} from "icecrown";
import { Maybe, MaybeConstructor } from "./";
import Nothing, { isNothing } from "./Nothing";

interface Constructor extends MaybeConstructor {
  new <T>(__value?: T): Maybe<T>;
}

const Just = <Constructor>class Just<T> implements Maybe<T> {
  constructor(public __value?: T) {}

  static zero = () => new Nothing();
  static empty = () => new Nothing();
  static of = <T1>(value: T1) => new Just(value);

  public equals<T1 extends Setoid, T>(this: typeof other, other: Maybe<T1>) {
    return isJust(other) && equals(other.__value, this.__value);
  }

  public lte<T1 extends Ord, T>(this: typeof other, other: Maybe<T1>) {
    return isJust(other) && lte(other.__value, this.__value);
  }

  public concat<T1 extends Semigroup, T>(this: typeof other, other: Maybe<T1>) {
    return isNothing(other)
      ? this
      : new Just(concat(other.__value, this.__value));
  }

  public map<T1>(f: (a: T) => T1) {
    return new Just(f(this.__value));
  }

  public ap<T1>(other: Maybe<(x: T) => T1>) {
    return isNothing(other)
      ? new Nothing()
      : new Just(other.__value(this.__value));
  }

  public chain<T1>(f: (a: T) => Maybe<T1>) {
    return f(this.__value);
  }

  public alt<T1>(other: Maybe<T1>) {
    return this;
  }

  public reduce<T1>(f: (acc: T1, value: T) => T1, initial: T1) {
    return f(initial, this.__value);
  }

  public traverse<T1>(A: ApplicativeConstructor, f: (a: T) => Applicative<T1>) {
    return f(this.__value).map(Just.of) as any;
  }

  public extend<T1>(f: (a: Maybe<T>) => T1) {
    return new Just(f(this));
  }
};

export const isJust = <T>(a: Maybe<T>) => a instanceof Just;

export default Just;
