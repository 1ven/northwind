import Just from "../Just";
import { makeCompose } from "./helpers";

test("conforms Setoid reflexivity", () => {
  const a = new Just("a");
  expect(a.equals(a)).toBeTruthy();
});

test("conforms Setoid symmetry", () => {
  const a = new Just("a"),
    b = new Just("b");
  expect(a.equals(b) === b.equals(a)).toBeTruthy();
});

test("conforms Setoid transitivity", () => {
  const a = new Just(5),
    b = new Just(5),
    c = new Just(5);
  expect(a.equals(b)).toBeTruthy();
  expect(b.equals(c)).toBeTruthy();
  expect(a.equals(c)).toBeTruthy();
});

test("conforms Ord totality");

test("conforms Ord antisymmetry", () => {
  const a = new Just(5),
    b = new Just(5);
  expect(a.lte(b)).toBeTruthy();
  expect(b.lte(a)).toBeTruthy();
  expect(a.equals(b)).toBeTruthy();
});

test("conforms Ord transitivity", () => {
  const a = new Just("a"),
    b = new Just("b"),
    c = new Just("c");
  expect(a.lte(b)).toBeTruthy();
  expect(b.lte(c)).toBeTruthy();
  expect(a.lte(c)).toBeTruthy();
});

test("conforms Semigroup associativity", () => {
  const a = new Just("a"),
    b = new Just("b"),
    c = new Just("c");
  expect(a.concat(b).concat(c)).toEqual(a.concat(b.concat(c)));
});

test("conforms Monoid right identity", () => {
  const a = new Just("a");
  expect(a.concat(Just.empty())).toEqual(a);
});

test("conforms Monoid left identity", () => {
  const a = new Just("a");
  expect(Just.empty().concat(a)).toEqual(a);
});

test("conforms Functor identity", () => {
  const a = new Just("a");
  expect(a.map(x => x)).toEqual(a);
});

test("conforms Functor composition", () => {
  const a = new Just("a"),
    f = x => x + "b",
    g = x => x + "c";
  expect(a.map(x => f(g(x)))).toEqual(a.map(g).map(f));
});

test("conforms Apply composition", () => {
  const a = new Just("a"),
    b = new Just(x => x + "b"),
    c = new Just(x => x + "c");
  expect(a.ap(b.ap(c.map(f => g => x => f(g(x)))))).toEqual(a.ap(b).ap(c));
});

test("conforms Applicative identity", () => {
  const a = new Just("a");
  expect(a.ap(Just.of(x => x))).toEqual(a);
});

test("conforms Applicative homomorphism", () => {
  const a = "a",
    f = x => x + "b";
  expect(Just.of(a).ap(Just.of(f))).toEqual(Just.of(f(a)));
});

test("conforms Applicative interchange", () => {
  const a = "a",
    b = new Just(x => x + "b");
  expect(Just.of(a).ap(b)).toEqual(b.ap(Just.of(f => f(a))));
});

test("conforms Alt associativity", () => {
  const a = new Just("a"),
    b = new Just("b"),
    c = new Just("c");
  expect(a.alt(b).alt(c)).toEqual(a.alt(b.alt(c)));
});

test("conforms Alt distributivity", () => {
  const a = new Just("a"),
    b = new Just("b"),
    f = x => x + "c";
  expect(a.alt(b).map(f)).toEqual(a.map(f).alt(b.map(f)));
});

test("conforms Plus right identity", () => {
  const a = new Just("a");
  expect(a.alt(Just.zero())).toEqual(a);
});

test("conforms Plus left identity", () => {
  const a = new Just("a");
  expect(Just.zero().alt(a)).toEqual(a);
});

test("conforms Plus left annihilation", () => {
  const f = x => x + "a";
  expect(Just.zero().map(f)).toEqual(Just.zero());
});

test("conforms Alternative distributivity", () => {
  const a = new Just("a"),
    b = new Just(x => x + "b"),
    c = new Just(x => x + "c");
  expect(a.ap(b.alt(c))).toEqual(a.ap(b).alt(a.ap(c)));
});

test("conforms Alternative annihilation", () => {
  const a = new Just("a");
  expect(a.ap(Just.zero())).toEqual(Just.zero());
});

test("conforms Foldable associativity", () => {
  const a = new Just("a"),
    f = (acc, x) => acc + x;
  expect(a.reduce(f, "z")).toEqual(
    a.reduce((acc, x) => acc.concat([x]), []).reduce(f, "z")
  );
});

test("conforms Traversable naturality", () => {
  const u = new Just(new Just(5)),
    t = x => [x];
  expect(t(u.traverse(Just, x => x))).toEqual(u.traverse(Array, t));
});

test("conforms Traversable identity", () => {
  const u = new Just("u");
  expect(u.traverse(Array, Array.of)).toEqual(Array.of(u));
});

test("conforms Traversable composition", () => {
  const u = new Just(new Just(new Just("u"))),
    F = Just,
    G: any = Array,
    Compose: any = makeCompose(F, G);
  expect(u.traverse(Compose, x => new Compose(x))).toEqual(
    new Compose(u.traverse(F, x => x).map(x => x.traverse(G, x => x)))
  );
});

test("conforms Chain associativity", () => {
  const m = new Just("m"),
    f = x => new Just(x + "f"),
    g = x => new Just(x + "g");
  expect(m.chain(f).chain(g)).toEqual(m.chain(x => f(x).chain(g)));
});

test("conforms Monad left identity", () => {
  const a = "a",
    f = x => new Just(x + "f");
  expect(Just.of(a).chain(f)).toEqual(f(a));
});

test("conforms Monad right identity", () => {
  const m = new Just("m");
  expect(m.chain(Just.of)).toEqual(m);
});

test("conforms Extend associativity", () => {
  const w = new Just("w"),
    g = x => x.concat(new Just("f")),
    f = x => x.concat(new Just("g"));
  expect(w.extend(g).extend(f)).toEqual(w.extend(_w => f(_w.extend(g))));
});
