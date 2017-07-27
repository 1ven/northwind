import { laws } from "icecrown";
import Nothing from "../Nothing";

test("conforms Setoid reflexivity", () => {
  laws.Setoid.reflexivity(new Nothing());
});

test("conforms Setoid symmetry", () => {
  laws.Setoid.symmetry(new Nothing(), new Nothing());
});

test("conforms Setoid transitivity", () => {
  laws.Setoid.transitivity(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Ord totality", () => {
  laws.Ord.totality(new Nothing(), new Nothing());
});

test("conforms Ord antisymmetry", () => {
  laws.Ord.antisymmetry(new Nothing(), new Nothing());
});

test("conforms Ord transitivity", () => {
  laws.Ord.transitivity(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Semigroup associativity", () => {
  laws.Semigroup.associativity(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Monoid right identity", () => {
  laws.Monoid.rightIdentity(Nothing, new Nothing());
});

test("conforms Monoid left identity", () => {
  laws.Monoid.leftIdentity(Nothing, new Nothing());
});

test("conforms Functor identity", () => {
  laws.Functor.identity(new Nothing());
});

test("conforms Functor composition", () => {
  laws.Functor.composition(new Nothing(), x => x + "f", x => x + "g");
});

test("conforms Apply composition", () => {
  laws.Apply.composition(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Applicative identity", () => {
  laws.Applicative.identity(Nothing, new Nothing());
});

test("conforms Applicative homomorphism", () => {
  laws.Applicative.homomorphism(Nothing, "x", x => x + "f");
});

test("conforms Applicative interchange", () => {
  laws.Applicative.interchange(Nothing, "y", new Nothing());
});

test("conforms Alt associativity", () => {
  laws.Alt.associativity(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Alt distributivity", () => {
  laws.Alt.distributivity(new Nothing(), new Nothing(), x => x + "f");
});

test("conforms Plus right identity", () => {
  laws.Plus.rightIdentity(Nothing, new Nothing());
});

test("conforms Plus left identity", () => {
  laws.Plus.leftIdentity(Nothing, new Nothing());
});

test("conforms Plus annihilation", () => {
  laws.Plus.annihilation(Nothing, x => x + "f");
});

test("conforms Alternative distributivity", () => {
  laws.Alternative.distributivity(new Nothing(), new Nothing(), new Nothing());
});

test("conforms Alternative annihilation", () => {
  laws.Alternative.annihilation(Nothing, new Nothing());
});

test("conforms Foldable associativity", () => {
  laws.Foldable.associativity(new Nothing(), (acc, x) => acc + x);
});

test("conforms Traversable naturality", () => {
  laws.Traversable.naturality(Nothing, Array as any, new Nothing(), x => [x]);
});

test("conforms Traversable identity", () => {
  laws.Traversable.identity(Array as any, new Nothing());
});

test("conforms Traversable composition", () => {
  laws.Traversable.composition(Nothing, Array as any, new Nothing());
});

test("conforms Chain associativity", () => {
  laws.Chain.associativity(
    new Nothing(),
    x => new Nothing(),
    x => new Nothing()
  );
});

test("conforms Monad left identity", () => {
  laws.Monad.leftIdentity(Nothing, "a", x => new Nothing());
});

test("conforms Monad right identity", () => {
  laws.Monad.rightIdentity(Nothing, new Nothing());
});

test("conforms Extend associativity", () => {
  laws.Extend.associativity(
    new Nothing(),
    x => new Nothing(),
    x => new Nothing()
  );
});
