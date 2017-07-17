import * as Z from "sanctuary-type-classes";
import * as F from "fantasy-types";
import { Maybe, MaybeConstructor } from "./";
import { of, zero, empty } from "./static";

interface Constructor extends MaybeConstructor { new () }

const Nothing = <Constructor>class Nothing<T> implements Maybe<T> {
  static of = of;
  static zero = zero;
  static empty = empty;

  public equals(b: Maybe<T>) {
    return isNothing(b);
  }

  public lte(b: Maybe<T>) {
    return true;
  }

  public concat(b: Maybe<T>) {
    return b;
  }

  public map<T2>(f: (a: T) => T2) {
    return this as any;
  }

  public ap<T1>(b: Maybe<(x: T) => T1>) {
    return this as any;
  }

  public chain<T1>(f: (a: T) => Maybe<T1>) {
    return this as any;
  }

  public alt<T1>(b: Maybe<T1>) {
    return b;
  }

  public reduce<T1>(fn: (acc: T1, value: T) => T1, initial: T1) {
    return initial;
  }

  public traverse<T1>(
    A: F.ApplicativeConstructor,
    f: (a: T) => F.Applicative<T1>
  ) {
    return Z.of(A, this);
  }

  public extend<T1>(f: (a: Maybe<T>) => T1) {
    return this as any;
  }
};

export const isNothing = <T>(a: Maybe<T>): boolean => a instanceof Nothing;

export default Nothing;
