/* eslint-disable @typescript-eslint/no-unused-vars */
import { Helper } from "@/Helper";
import { LokiOps } from "@/LokiOps";
import { LokiDoc, LokiDocArray, LokiDocObj, LokiObj } from "@/type";

describe("Helper", () => {
  describe("containsCheckFn", () => {
    it("should return a function that checks if a string contains the given value", () => {
      const containsFoo = Helper.containsCheckFn("foo")!;
      expect(containsFoo("f")).toBe(true);
      expect(containsFoo("b")).toBe(false);

      const containsBar = Helper.containsCheckFn("bar")!;
      expect(containsBar("b")).toBe(true);
      expect(containsBar("f")).toBe(false);
    });

    it("should return a function that checks if an array contains the given value", () => {
      const containsFoo = Helper.containsCheckFn(["foo", "baz"])!;
      expect(containsFoo("foo")).toBe(true);
      expect(containsFoo("bar")).toBe(false);

      const containsBar = Helper.containsCheckFn(["bar", "baz"])!;
      expect(containsBar("bar")).toBe(true);
      expect(containsBar("foo")).toBe(false);
    });

    it("should return a function that checks if an object has the given property", () => {
      const containsFoo = Helper.containsCheckFn({ foo: true, baz: true })!;
      expect(containsFoo("foo")).toBe(true);
      expect(containsFoo("bar")).toBe(false);

      const containsBar = Helper.containsCheckFn({ bar: true, baz: true })!;
      expect(containsBar("bar")).toBe(true);
      expect(containsBar("foo")).toBe(false);
    });

    it("should return null if the input is null or undefined", () => {
      expect(Helper.containsCheckFn(null)).toBeNull();
      expect(Helper.containsCheckFn(undefined)).toBeNull();
    });
  });
});

describe("valueLevelOp", () => {
  it("should throw an error if the third argument is not a string or a function", () => {
    expect(() =>
      Helper.valueLevelOp("$$test", null, {} as string, null),
    ).toThrow("Invalid argument to $$ matcher");
  });

  it("should call the LokiOps function with the correct arguments when the third argument is a string", () => {
    const op = "$eq";
    const a = 5;
    const spec = "foo";
    const record = { foo: 5 };
    const spy = jest.spyOn(LokiOps, op);

    Helper.valueLevelOp(op, a, spec, record);

    expect(spy).toHaveBeenCalledWith(a, record[spec]);
  });

  it("should call the LokiOps function with the correct arguments when the third argument is a function", () => {
    const op = "$eq";
    const a = 5;
    const spec = (record: object): boolean => (record as { foo: boolean }).foo;
    const record = { foo: true };
    const spy = jest.spyOn(LokiOps, op);

    Helper.valueLevelOp(op, a, spec, record);

    expect(spy).toHaveBeenCalledWith(a, spec(record));
  });

  describe("dotSubScan", () => {
    it("should return true if the element matches the value", () => {
      const root = {
        foo: {
          bar: {
            baz: {
              qux: 42,
            },
          },
        },
      };
      const paths = ["foo", "bar", "baz", "qux"];
      const fun = (
        element: LokiObj,
        _value: LokiObj | Record<string, LokiObj>,
        _extra: LokiObj,
      ): boolean => element === 42;
      const value = 42;
      const extra = {};

      expect(Helper.dotSubScan(root, paths, fun, value, extra)).toBe(true);
    });

    it("should return false if the element does not match the value", () => {
      const root = {
        foo: {
          bar: {
            baz: {
              qux: 42,
            },
          },
        },
      };
      const paths = ["foo", "bar", "baz", "qux"];
      const fun = (
        element: LokiObj,
        _value: LokiObj | Record<string, LokiObj>,
        _extra: LokiObj,
      ): boolean => element === 43;
      const value = 42;
      const extra = {};

      expect(Helper.dotSubScan(root, paths, fun, value, extra)).toBe(false);
    });

    it("should return false if the element is not found", () => {
      const root = {
        foo: {
          bar: {
            baz: {
              qux: 42,
            },
          },
        },
      };
      const paths = ["foo", "bar", "baz", "quux"];
      const fun = (
        element: LokiObj,
        _value: LokiObj | Record<string, LokiObj>,
        _extra: LokiObj,
      ): boolean => element === 42;
      const value = 42;
      const extra = {};

      expect(Helper.dotSubScan(root, paths, fun, value, extra)).toBe(false);
    });

    it("should handle arrays correctly", () => {
      const root = {
        foo: [
          {
            bar: {
              baz: {
                qux: 42,
              },
            },
          },
          {
            bar: {
              baz: {
                qux: 43,
              },
            },
          },
        ],
      };
      const paths = ["foo", "bar", "baz", "qux"];
      const fun = (
        element: LokiObj,
        _value: LokiObj | Record<string, LokiObj>,
        _extra: LokiObj,
      ): boolean => element === 43;
      const value = 43;
      const extra = {};

      expect(Helper.dotSubScan(root, paths, fun, value, extra)).toBe(true);
    });

    it("should handle dot notation correctly", () => {
      const root = {
        "foo.bar": {
          baz: {
            qux: 42,
          },
        },
      };
      const paths = ["foo.bar", "baz", "qux"];
      const fun = (
        element: LokiObj,
        _value: LokiObj | Record<string, LokiObj>,
        _extra: LokiObj,
      ): boolean => element === 42;
      const value = 42;
      const extra = {};

      expect(Helper.dotSubScan(root, paths, fun, value, extra)).toBe(true);
    });
  });

  describe("doQueryOp", () => {
    it("should return true if the value matches the query operation", () => {
      const val = 5;
      const op = { $eq: 5 };
      const record = {};
      const result = Helper.doQueryOp(val, op, record);
      expect(result).toBe(true);
    });

    it("should return false if the value does not match the query operation", () => {
      const val = 5;
      const op = { $eq: 6 };
      const record = {};
      const result = Helper.doQueryOp(val, op, record);
      expect(result).toBe(false);
    });

    it("should call the LokiOps function with the correct arguments", () => {
      const val = 5;
      const op = { $eq: 5 };
      const record = {};
      const spy = jest.spyOn(LokiOps, "$eq");
      Helper.doQueryOp(val, op, record);
      expect(spy).toHaveBeenCalledWith(val, op.$eq, record);
    });

    it("should return false if the query operation is not valid", () => {
      const val = 5;
      const op = { $invalid: 5 };
      const record = {};
      const result = Helper.doQueryOp(val, op, record);
      expect(result).toBe(false);
    });
  });

  describe("clone", () => {
    it("should return null if the input is null or undefined", () => {
      expect(Helper.clone(null, "parse-stringify")).toBeNull();
      expect(Helper.clone(undefined, "parse-stringify")).toBeNull();
    });
    const obj = { foo: "bar", baz: { qux: 42 }, quux: [1, 2, 3] };
    it("should clone an object using the parse-stringify method", () => {
      const cloned = Helper.clone(obj, "parse-stringify");
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect((cloned as LokiDocObj)["baz"]).not.toBe(obj.baz);
    });

    it("should clone an object using the shallow method", () => {
      const cloned = Helper.clone(obj, "shallow");
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect((cloned as LokiDocObj)["baz"]).toBe(obj.baz);
    });

    it("should clone an object using the shallow-assign method", () => {
      const cloned = Helper.clone(obj, "shallow-assign");
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect((cloned as LokiDocObj)["baz"]).toBe(obj.baz);
    });
  });

  describe("cloneObjectArray", () => {
    const objarray = [
      { foo: "bar", baz: { qux: 42 } },
      { foo: "baz", baz: { qux: 43 } },
    ];

    it("should clone an object array using the parse-stringify method", () => {
      const cloned = Helper.cloneObjectArray(objarray, "parse-stringify");
      expect(cloned).toEqual(objarray);
      expect(cloned).not.toBe(objarray);
      expect(((cloned as LokiDocArray)[0] as LokiDocObj)["baz"]).not.toBe(
        objarray[0].baz,
      );
    });

    it("should clone an object array using the shallow method", () => {
      const cloned = Helper.cloneObjectArray(objarray, "shallow");
      expect(cloned).toEqual(objarray);
      expect(cloned).not.toBe(objarray);
      expect(((cloned as LokiDocArray)[0] as LokiDocObj)["baz"]).toBe(
        objarray[0].baz,
      );
    });

    it("should clone an object array using the shallow-assign method", () => {
      const cloned = Helper.cloneObjectArray(objarray, "shallow-assign");
      expect(cloned).toEqual(objarray);
      expect(cloned).not.toBe(objarray);
      expect(((cloned as LokiDocArray)[0] as LokiDocObj)["baz"]).toBe(
        objarray[0].baz,
      );
    });
  });

  describe("deepFreeze", () => {
    it("should freeze an object", () => {
      const obj = { foo: "bar" };
      Helper.deepFreeze(obj);
      expect(Object.isFrozen(obj)).toBe(true);
    });

    it("should freeze an array", () => {
      const obj: LokiDoc = [
        {
          foo: "bar",
        },
      ];
      Helper.deepFreeze(obj);
      expect(Object.isFrozen(obj)).toBe(true);
    });
  });

  describe("freeze", () => {
    it("should freeze an object", () => {
      const obj = { foo: "bar" };
      Helper.freeze(obj);
      expect(Object.isFrozen(obj)).toBe(true);
    });

    it("should not freeze an already frozen object", () => {
      const obj = { foo: "bar" };
      Object.freeze(obj);
      Helper.freeze(obj);
      expect(Object.isFrozen(obj)).toBe(true);
    });

    it("should not freeze a circular object", () => {
      const obj: LokiDoc = {
        foo: "bar",
      };
      obj["baz"] = obj;
      expect(() => Helper.freeze(obj)).not.toThrow();
      expect(Object.isFrozen(obj)).toBe(true);
    });
  });

  describe("unFreeze", () => {
    it("should return the object if it is not frozen", () => {
      const obj = { foo: "bar" };
      expect(Helper.unFreeze(obj)).toBe(obj);
    });

    it("should return a shallow clone of the object if it is frozen", () => {
      const obj = Object.freeze({ foo: "bar" });
      const result = Helper.unFreeze(obj);
      expect(result).toEqual(obj);
      expect(result).not.toBe(obj);
    });
  });
});
