import * as F from "fantasy-types";
import { makeCompose } from "./helpers";

export const Setoid = {
  reflexivity: (a: F.Setoid) => {
    expect(a.equals(a)).toBeTruthy();
  },
  symmetry: (a: F.Setoid, b: F.Setoid) => {
    expect(a.equals(b) === b.equals(a)).toBeTruthy();
  },
  transitivity: (a: F.Setoid, b: F.Setoid, c: F.Setoid) => {
    expect(a.equals(b)).toBeTruthy();
    expect(b.equals(c)).toBeTruthy();
    expect(a.equals(c)).toBeTruthy();
  }
};

export const Ord = {
  totality: (a: F.Ord, b: F.Ord) => {
    expect(a.lte(b) || b.lte(a)).toBeTruthy();
  },
  antisymmetry: (a: F.Ord, b: F.Ord) => {
    expect(a.lte(b)).toBeTruthy();
    expect(b.lte(a)).toBeTruthy();
    expect(a.equals(b)).toBeTruthy();
  },
  transitivity: (a: F.Ord, b: F.Ord, c: F.Ord) => {
    expect(a.lte(b)).toBeTruthy();
    expect(b.lte(c)).toBeTruthy();
    expect(a.lte(c)).toBeTruthy();
  }
};

export const Semigroup = {
  associativity: (a: F.Semigroup, b: F.Semigroup, c: F.Semigroup) => {
    expect(a.concat(b).concat(c)).toEqual(a.concat(b.concat(c)));
  }
};

export const Monoid = {
  "right identity": (M: F.MonoidConstructor, m: F.Monoid) => {
    expect(m.concat(M.empty())).toEqual(m);
  },
  "left identity": (M: F.MonoidConstructor, m: F.Monoid) => {
    expect(M.empty().concat(m)).toEqual(m);
  }
};

export const Functor = {
  identity: <T>(u: F.Functor<T>) => {
    expect(u.map(a => a)).toEqual(u);
  },
  composition: <T>(u: F.Functor<T>, f, g) => {
    expect(u.map(x => f(g(x)))).toEqual(u.map(g).map(f));
  }
};

export const Apply = {
  composition: <T>(
    v: F.Apply<T>,
    u: F.Apply<(x: T) => T>,
    a: F.Apply<(x: T) => T>
  ) => {
    expect(v.ap(u.ap(a.map(f => g => x => f(g(x))) as any))).toEqual(
      v.ap(u).ap(a)
    );
  }
};

export const Applicative = {
  identity: <T>(A: F.ApplicativeConstructor, v: F.Applicative<T>) => {
    expect(v.ap(A.of(x => x))).toEqual(v);
  },
  homomorphism: (A: F.ApplicativeConstructor, x: string, f) => {
    expect(A.of(x).ap(A.of(f))).toEqual(A.of(f(x)));
  },
  interchange: <T>(
    A: F.ApplicativeConstructor,
    y: string,
    u: F.Applicative<(a) => T>
  ) => {
    expect(A.of(y).ap(u)).toEqual(u.ap(A.of(f => f(y))));
  }
};

export const Alt = {
  associativity: <T>(a: F.Alt<T>, b: F.Alt<T>, c: F.Alt<T>) => {
    expect(a.alt(b).alt(c)).toEqual(a.alt(b.alt(c)));
  },
  distributivity: <T>(a: F.Alt<T>, b: F.Alt<T>, f) => {
    expect(a.alt(b).map(f)).toEqual((a.map(f) as any).alt(b.map(f)));
  }
};

export const Plus = {
  "right identity": <T>(A: F.PlusConstructor, x: F.Alt<T>) => {
    expect(x.alt(A.zero())).toEqual(x);
  },
  "left identity": <T>(A: F.PlusConstructor, x: F.Alt<T>) => {
    expect(A.zero().alt(x)).toEqual(x);
  },
  annihilation: (A: F.PlusConstructor, f) => {
    expect(A.zero().map(f)).toEqual(A.zero());
  }
};

export const Alternative = {
  distributivity: <T>(
    x: F.Alternative<T>,
    f: F.Alternative<(a) => T>,
    g: F.Alternative<(a) => T>
  ) => {
    expect(x.ap(f.alt(g) as any)).toEqual((x.ap(f) as any).alt(x.ap(g)));
  },
  annihilation: <T>(A: F.PlusConstructor, x: F.Alternative<T>) => {
    expect(x.ap(A.zero() as any)).toEqual(A.zero());
  }
};

export const Foldable = {
  associativity: <T>(u: F.Foldable<T>, f) => {
    expect(u.reduce(f, "z")).toEqual(
      u.reduce((acc, x) => acc.concat([x]), []).reduce(f, "z")
    );
  }
};

export const Traversable = {
  naturality: <T>(
    F: F.ApplicativeConstructor,
    G: F.ApplicativeConstructor,
    u: F.Traversable<F.Applicative<T>>,
    t
  ) => {
    expect(t(u.traverse(F, x => x))).toEqual(u.traverse(G, t));
  },
  identity: <T>(F: F.ApplicativeConstructor, u: F.Traversable<T>) => {
    expect(u.traverse(F, F.of)).toEqual(F.of(u));
  },
  composition: <T>(
    F: F.ApplicativeConstructor,
    G: F.ApplicativeConstructor,
    u
  ) => {
    const Compose: any = makeCompose(F, G);
    expect(u.traverse(Compose, x => new Compose(x))).toEqual(
      new Compose(u.traverse(F, x => x).map(x => x.traverse(G, x => x)))
    );
  }
};

export const Chain = {
  associativity: <T>(
    m: F.Chain<T>,
    f: (a: T) => F.Chain<T>,
    g: (a: T) => F.Chain<T>
  ) => {
    expect(m.chain(f).chain(g)).toEqual(m.chain(x => f(x).chain(g)));
  }
};

export const Monad = {
  "left identity": <T>(
    M: F.MonadConstructor,
    a: T,
    f: (a: T) => F.Monad<T>
  ) => {
    expect(M.of(a).chain(f)).toEqual(f(a));
  },
  "right identity": <T>(M: F.MonadConstructor, m: F.Monad<T>) => {
    expect(m.chain(M.of)).toEqual(m);
  }
};

export const Extend = {
  associativity: <T>(
    w: F.Extend<T>,
    g: (a: F.Extend<T>) => F.Extend<T>,
    f: (a: F.Extend<F.Extend<T>>) => F.Extend<F.Extend<T>>
  ) => {
    expect(w.extend(g).extend(f)).toEqual(w.extend(_w => f(_w.extend(g))));
  }
};
