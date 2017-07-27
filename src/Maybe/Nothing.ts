import { Applicative, ApplicativeConstructor } from "icecrown";
import { Maybe, MaybeConstructor } from "./";

interface Constructor extends MaybeConstructor { new () }

const Nothing = <Constructor>class Nothing implements Maybe<void> {
  static zero = () => new Nothing();
  static empty = () => new Nothing();
  static of = <T>(value: T) => new Nothing();

  public equals<T1>(other: Maybe<T1>) {
    return isNothing(other);
  }

  public lte<T1>(other: Maybe<T1>) {
    return true;
  }

  public concat<T1>(other: Maybe<T1>) {
    return other;
  }

  public map<T, T1>(f: (a: T) => T1) {
    return this;
  }

  public ap<T, T1>(other: Maybe<(x: T) => T1>) {
    return this;
  }

  public chain<T, T1>(f: (a: T) => Maybe<T1>) {
    return this;
  }

  public alt<T1>(other: Maybe<T1>) {
    return other;
  }

  public reduce<T, T1>(fn: (acc: T1, value: T) => T1, initial: T1) {
    return initial;
  }

  public traverse<T, T1>(
    A: ApplicativeConstructor,
    f: (a: T) => Applicative<T1>
  ) {
    return A.of(new Nothing());
  }

  public extend<T1>(f: (a: Nothing) => T1) {
    return this;
  }
};

export const isNothing = <T>(a: Maybe<T>) => a instanceof Nothing;

export default Nothing;
