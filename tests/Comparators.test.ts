import { Comparators } from "@/Comparators";

describe("Comparators", () => {
  describe("aeq", () => {
    it("should return true if the two values are equal", () => {
      expect(Comparators.aeq(5, 5)).toBe(true);
      expect(Comparators.aeq("foo", "foo")).toBe(true);
      expect(Comparators.aeq(null, null)).toBe(true);
      expect(Comparators.aeq(undefined, undefined)).toBe(true);
      expect(Comparators.aeq(true, true)).toBe(true);
      expect(Comparators.aeq(false, false)).toBe(true);
    });

    it("should return false if the two values are not equal", () => {
      expect(Comparators.aeq(5, 6)).toBe(false);
      expect(Comparators.aeq("foo", "bar")).toBe(false);
      expect(Comparators.aeq(true, false)).toBe(false);
    });
  });

  describe("gt", () => {
    it("should return true if the first value is greater than the second value", () => {
      expect(Comparators.gt(6, 5, false)).toBe(true);
      expect(Comparators.gt("foo", "bar", false)).toBe(true);
      expect(Comparators.gt("foo", 5, false)).toBe(true);
      expect(Comparators.gt(true, false, false)).toBe(true);
    });

    it("should return false if the first value is less than or equal to the second value", () => {
      expect(Comparators.gt(5, 6, false)).toBe(false);
      expect(Comparators.gt("bar", "foo", false)).toBe(false);
      expect(Comparators.gt(5, "foo", false)).toBe(false);
      expect(Comparators.gt(false, true, false)).toBe(false);
      expect(Comparators.gt(5, 5, false)).toBe(false);
      expect(Comparators.gt("foo", "foo", false)).toBe(false);
      expect(Comparators.gt(null, null, false)).toBe(false);
      expect(Comparators.gt(undefined, undefined, false)).toBe(false);
      expect(Comparators.gt(true, true, false)).toBe(false);
      expect(Comparators.gt(false, false, false)).toBe(false);
    });

    it("should return true if the first value is greater than or equal to the second value and equal is true", () => {
      expect(Comparators.gt(6, 5, true)).toBe(true);
      expect(Comparators.gt("foo", "bar", true)).toBe(true);
      expect(Comparators.gt("foo", 5, true)).toBe(true);
      expect(Comparators.gt(true, false, true)).toBe(true);
      expect(Comparators.gt(5, 5, true)).toBe(true);
      expect(Comparators.gt("foo", "foo", true)).toBe(true);
    });

    it("should return false if the first value is less than the second value and equal is true", () => {
      expect(Comparators.gt(5, 6, true)).toBe(false);
      expect(Comparators.gt("bar", "foo", true)).toBe(false);
      expect(Comparators.gt(5, "foo", true)).toBe(false);
      expect(Comparators.gt(false, true, true)).toBe(false);
    });
  });

  describe("lt", () => {
    it("should return true if the first value is less than the second value", () => {
      expect(Comparators.lt(5, 6, false)).toBe(true);
      expect(Comparators.lt("bar", "foo", false)).toBe(true);
      expect(Comparators.lt(5, "foo", false)).toBe(true);
      expect(Comparators.lt(false, true, false)).toBe(true);
    });

    it("should return false if the first value is greater than or equal to the second value", () => {
      expect(Comparators.lt(6, 5, false)).toBe(false);
      expect(Comparators.lt("foo", "bar", false)).toBe(false);
      expect(Comparators.lt("foo", 5, false)).toBe(false);
      expect(Comparators.lt(true, false, false)).toBe(false);
      expect(Comparators.lt(5, 5, false)).toBe(false);
      expect(Comparators.lt("foo", "foo", false)).toBe(false);
      expect(Comparators.lt(null, null, false)).toBe(false);
      expect(Comparators.lt(undefined, undefined, false)).toBe(false);
      expect(Comparators.lt(true, true, false)).toBe(false);
      expect(Comparators.lt(false, false, false)).toBe(false);
    });

    it("should return true if the first value is less than or equal to the second value and equal is true", () => {
      expect(Comparators.lt(5, 6, true)).toBe(true);
      expect(Comparators.lt("bar", "foo", true)).toBe(true);
      expect(Comparators.lt(5, "foo", true)).toBe(true);
      expect(Comparators.lt(false, true, true)).toBe(true);
      expect(Comparators.lt(5, 5, true)).toBe(true);
      expect(Comparators.lt("foo", "foo", true)).toBe(true);
    });

    it("should return false if the first value is greater than the second value and equal is true", () => {
      expect(Comparators.lt(6, 5, true)).toBe(false);
      expect(Comparators.lt("foo", "bar", true)).toBe(false);
      expect(Comparators.lt("foo", 5, true)).toBe(false);
      expect(Comparators.lt(true, false, true)).toBe(false);
    });
  });
});
