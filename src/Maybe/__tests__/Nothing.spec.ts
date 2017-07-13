import Nothing from "../Nothing";

test("conforms Setoid reflexivity", () => {
  const a = new Nothing();
  expect(a.equals(a)).toBeTruthy();
});

test("conforms Setoid symmetry", () => {
  const a = new Nothing(),
    b = new Nothing();
  expect(a.equals(b) === b.equals(a)).toBeTruthy();
});
