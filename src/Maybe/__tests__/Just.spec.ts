import Just from "../Just";

test("conforms Setoid reflexivity", () => {
  const a = new Just(5);
  expect(a.equals(a)).toBeTruthy();
});

test("conforms Setoid symmetry", () => {
  const a = new Just(5),
    b = new Just(7);
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
  const a = new Just(1),
    b = new Just(2),
    c = new Just(3);
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

test("conforms Applicative identity", () => {
  const a = "a",
    f = x => x + "b";
  expect(Just.of(a).ap(Just.of(f))).toEqual(Just.of(f(a)));
});
