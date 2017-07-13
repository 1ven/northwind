import { Nothing } from "../Nothing";

test("conforms Setoid reflexivity", () => {
  const a = Nothing();
  expect(a.equals(a)).toBeTruthy();
});

test("conforms Setoid symmetry", () => {
  const a = Nothing(),
    b = Nothing();
  expect(a.equals(b) === b.equals(a)).toBeTruthy();
});
