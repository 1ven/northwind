import { Just } from "../Just";

test("conforms Setoid reflexivity", () => {
  const a = Just(5);
  expect(a.equals(a)).toBeTruthy();
});

test("conforms Setoid symmetry", () => {
  const a = Just(5),
    b = Just(7);
  expect(a.equals(b) === b.equals(a)).toBeTruthy();
});

test("conforms Setoid transitivity", () => {
  const a = Just(5),
    b = Just(5),
    c = Just(5);
  expect(a.equals(b)).toBeTruthy();
  expect(b.equals(c)).toBeTruthy();
  expect(a.equals(c)).toBeTruthy();
});

test("conforms Ord totality");

test("conforms Ord antisymmetry", () => {
  const a = Just(5),
    b = Just(5);
  expect(a.lte(b)).toBeTruthy();
  expect(b.lte(a)).toBeTruthy();
  expect(a.equals(b)).toBeTruthy();
});

test("conforms Ord transitivity", () => {
  const a = Just(1),
    b = Just(2),
    c = Just(3);
  expect(a.lte(b)).toBeTruthy();
  expect(b.lte(c)).toBeTruthy();
  expect(a.lte(c)).toBeTruthy();
});

test("conforms Semigroup associativity", () => {
  const a = Just("a"),
    b = Just("b"),
    c = Just("c");
  expect(a.concat(b).concat(c)).toEqual(a.concat(b.concat(c)));
});

test("conforms Monoid right identity", () => {
  const a = Just("a");
  expect(a.concat(Just.empty())).toEqual(a);
});

test("conforms Monoid left identity", () => {
  const a = Just("a");
  expect(Just.empty().concat(a)).toEqual(a);
});
