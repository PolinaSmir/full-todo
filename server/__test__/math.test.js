function sum(a, b) {
  return Number(a) + Number(b);
}

describe("tests sum function", () => {
  test("Add 5 to 10 expect 15", () => {
    expect(sum(5, 10)).toBe(15);
  });

  test("Add 2:string to 3 expect 5:Number", () => {
    expect(sum("2", 3)).toBe(5);
  });

  test("Add 0.1:Number to 0.2:Number expect 0.3:Number", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
