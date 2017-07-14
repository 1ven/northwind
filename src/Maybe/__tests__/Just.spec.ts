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
  const m = new Just("m"),
    M = Just;
  expect(m.concat(M.empty())).toEqual(m);
});

test("conforms Monoid left identity", () => {
  const m = new Just("m"),
    M = Just;
  expect(M.empty().concat(m)).toEqual(m);
});

test("conforms Functor identity", () => {
  const u = new Just("u");
  expect(u.map(a => a)).toEqual(u);
});

test("conforms Functor composition", () => {
  const u = new Just("u"),
    f = x => x + "f",
    g = x => x + "g";
  expect(u.map(x => f(g(x)))).toEqual(u.map(g).map(f));
});

test("conforms Apply composition", () => {
  const v = new Just("v"),
    u = new Just(x => x + "u"),
    a = new Just(x => x + "a");
  expect(v.ap(u.ap(a.map(f => g => x => f(g(x)))))).toEqual(v.ap(u).ap(a));
});

test("conforms Applicative identity", () => {
  const v = new Just("v"),
    A = Just;
  expect(v.ap(A.of(x => x))).toEqual(v);
});

test("conforms Applicative homomorphism", () => {
  const x = "x",
    f = x => x + "f",
    A = Just;
  expect(A.of(x).ap(A.of(f))).toEqual(A.of(f(x)));
});

test("conforms Applicative interchange", () => {
  const y = "y",
    u = new Just(x => x + "u"),
    A = Just;
  expect(A.of(y).ap(u)).toEqual(u.ap(A.of(f => f(y))));
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
    f = x => x + "f";
  expect(a.alt(b).map(f)).toEqual(a.map(f).alt(b.map(f)));
});

test("conforms Plus right identity", () => {
  const x = new Just("x"),
    A = Just;
  expect(x.alt(A.zero())).toEqual(x);
});

test("conforms Plus left identity", () => {
  const x = new Just("x"),
    A = Just;
  expect(A.zero().alt(x)).toEqual(x);
});

test("conforms Plus left annihilation", () => {
  const f = x => x + "f",
    A = Just;
  expect(A.zero().map(f)).toEqual(A.zero());
});

test("conforms Alternative distributivity", () => {
  const x = new Just("x"),
    f = new Just(x => x + "f"),
    g = new Just(x => x + "g");
  expect(x.ap(f.alt(g))).toEqual(x.ap(f).alt(x.ap(g)));
});

test("conforms Alternative annihilation", () => {
  const x = new Just("x"),
    A = Just;
  expect(x.ap(A.zero())).toEqual(A.zero());
});

test("conforms Foldable associativity", () => {
  const u = new Just("u"),
    f = (acc, x) => acc + x;
  expect(u.reduce(f, "z")).toEqual(
    u.reduce((acc, x) => acc.concat([x]), []).reduce(f, "z")
  );
});

test("conforms Traversable naturality", () => {
  const u = new Just(new Just(5)),
    t = x => [x],
    F = Just,
    G = Array;
  expect(t(u.traverse(F, x => x))).toEqual(u.traverse(G, t));
});

test("conforms Traversable identity", () => {
  const u = new Just("u"),
    F = Array;
  expect(u.traverse(F, F.of)).toEqual(F.of(u));
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
    f = x => new Just(x + "f"),
    M = Just;
  expect(M.of(a).chain(f)).toEqual(f(a));
});

test("conforms Monad right identity", () => {
  const m = new Just("m"),
    M = Just;
  expect(m.chain(M.of)).toEqual(m);
});

test("conforms Extend associativity", () => {
  const w = new Just("w"),
    g = x => x.concat(new Just("g")),
    f = x => x.concat(new Just("f"));
  expect(w.extend(g).extend(f)).toEqual(w.extend(_w => f(_w.extend(g))));
});
