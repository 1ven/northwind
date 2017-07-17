import Just from "../Just";
import * as laws from "../../__tests__/laws";

test("conforms Setoid reflexivity", () => {
  laws.Setoid.reflexivity(new Just("a"));
});

test("conforms Setoid symmetry", () => {
  laws.Setoid.symmetry(new Just("a"), new Just("b"));
});

test("conforms Setoid transitivity", () => {
  laws.Setoid.transitivity(new Just(1), new Just(1), new Just(1));
});

test("conforms Ord totality", () => {
  laws.Ord.totality(new Just(1), new Just(2));
});

test("conforms Ord antisymmetry", () => {
  laws.Ord.antisymmetry(new Just(1), new Just(1));
});

test("conforms Ord transitivity", () => {
  laws.Ord.transitivity(new Just("a"), new Just("b"), new Just("c"));
});

test("conforms Semigroup associativity", () => {
  laws.Semigroup.associativity(new Just("a"), new Just("b"), new Just("c"));
});

test("conforms Monoid right identity", () => {
  laws.Monoid["right identity"](Just, new Just("m"));
});

test("conforms Monoid left identity", () => {
  laws.Monoid["left identity"](Just, new Just("m"));
});

test("conforms Functor identity", () => {
  laws.Functor.identity(new Just("u"));
});

test("conforms Functor composition", () => {
  laws.Functor.composition(new Just("u"), x => x + "f", x => x + "g");
});

test("conforms Apply composition", () => {
  laws.Apply.composition(
    new Just("v"),
    new Just(x => x + "u"),
    new Just(x => x + "a")
  );
});

test("conforms Applicative identity", () => {
  laws.Applicative.identity(Just, new Just("v"));
});

test("conforms Applicative homomorphism", () => {
  laws.Applicative.homomorphism(Just, "x", x => x + "f");
});

test("conforms Applicative interchange", () => {
  laws.Applicative.interchange(Just, "y", new Just(x => x + "u"));
});

test("conforms Alt associativity", () => {
  laws.Alt.associativity(new Just("a"), new Just("b"), new Just("c"));
});

test("conforms Alt distributivity", () => {
  laws.Alt.distributivity(new Just("a"), new Just("b"), x => x + "f");
});

test("conforms Plus right identity", () => {
  laws.Plus["right identity"](Just, new Just("x"));
});

test("conforms Plus left identity", () => {
  laws.Plus["left identity"](Just, new Just("x"));
});

test("conforms Plus annihilation", () => {
  laws.Plus.annihilation(Just, x => x + "f");
});

test("conforms Alternative distributivity", () => {
  laws.Alternative.distributivity(
    new Just("x"),
    new Just(x => x + "f"),
    new Just(x => x + "f")
  );
});

test("conforms Alternative annihilation", () => {
  laws.Alternative.annihilation(Just, new Just("x"));
});

test("conforms Foldable associativity", () => {
  laws.Foldable.associativity(new Just("u"), (acc, x) => acc + x);
});

test("conforms Traversable naturality", () => {
  laws.Traversable.naturality(Just, Array as any, new Just(new Just(5)), x => [
    x
  ]);
});

test("conforms Traversable identity", () => {
  laws.Traversable.identity(Array as any, new Just("u"));
});

test("conforms Traversable composition", () => {
  laws.Traversable.composition(
    Just,
    Array as any,
    new Just(new Just(new Just("u")))
  );
});

test("conforms Chain associativity", () => {
  laws.Chain.associativity(
    new Just("m"),
    x => new Just(x + "f"),
    x => new Just(x + "g")
  );
});

test("conforms Monad left identity", () => {
  laws.Monad["left identity"](Just, "a", x => new Just(x + "f"));
});

test("conforms Monad right identity", () => {
  laws.Monad["right identity"](Just, new Just("m"));
});

test("conforms Extend associativity", () => {
  laws.Extend.associativity(
    new Just("w"),
    x => new Just("g"),
    x => new Just("f")
  );
});
