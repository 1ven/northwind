import { ApplicativeConstructor, Applicative, Apply } from "icecrown";

export const makeCompose = (
  F: ApplicativeConstructor,
  G: ApplicativeConstructor
) =>
  <ApplicativeConstructor>class Compose<T> implements Applicative<T> {
    constructor(public value: Applicative<Applicative<T>>) {}

    static of<T>(x: T) {
      return new Compose<T>(F.of(G.of(x)));
    }

    public ap<T1>(b: Compose<(a: T) => T1>) {
      // .map returns Functor, but should return Compose type. Generic problem
      return new Compose<T1>(
        this.value.ap(b.value.map(u => y => y.ap(u)) as any)
      );
    }

    public map<T1>(f: (a: T) => T1) {
      return new Compose<T1>(this.value.map(y => (y as any).map(f)) as any);
    }
  };
