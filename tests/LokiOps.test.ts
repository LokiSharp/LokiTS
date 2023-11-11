import { LokiOps } from "@/LokiOps";
import { LokiObj, LokiObjKeyAble, LokiObjNullAble } from "@/type";

describe("LokiOps", () => {
  describe("$", () => {
    const eqCases: [LokiObj, LokiObj, boolean][] = [
      [true, true, true],
      [false, false, true],
      ["Loki", "Loki", true],
      [0, 0, true],
      [+0, -0, true],
      [+0, 0, true],
      [-0, 0, true],
      [true, false, false],
      [false, true, false],
    ];

    const aeqCases: [LokiObj, LokiObj, boolean][] = [
      [0, false, true],
      ["", false, true],
      ["", 0, true],
      [0, "", true],
      ["0", 0, true],
      ["17", 17, true],
      [[1, 2], "1,2", true],
    ];

    const eqNullAbleCases: [LokiObjNullAble, LokiObjNullAble, boolean][] = [
      [undefined, undefined, true],
      [null, null, true],
    ];

    const aeqNullAbleCases: [LokiObjNullAble, LokiObjNullAble, boolean][] = [
      [null, undefined, true],
      [undefined, null, true],
    ];

    test.each(eqCases)("eqCases %p $eq %p, returns %p", (a, b, result) => {
      expect(LokiOps.$eq(a, b)).toBe(result);
    });

    test.each(eqNullAbleCases)(
      "eqNullAbleCases %p $eq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$eq(a, b)).toBe(result);
      },
    );

    test.each(aeqCases)("aeqCases %p $eq %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$eq(a, b)).toBe(!result);
    });

    test.each(aeqNullAbleCases)(
      "aeqNullAbleCases %p $eq %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$eq(a, b)).toBe(!result);
      },
    );

    test.each(eqCases)("eqCases %p $aeq %p, returns %p", (a, b, result) => {
      expect(LokiOps.$aeq(a, b)).toBe(result);
    });

    test.each(eqNullAbleCases)(
      "eqNullAbleCases %p $aeq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$aeq(a, b)).toBe(result);
      },
    );

    test.each(aeqCases)("aeqCases %p $aeq %p, returns %p", (a, b, result) => {
      expect(LokiOps.$aeq(a, b)).toBe(result);
    });

    test.each(aeqNullAbleCases)(
      "aeqNullAbleCases %p $aeq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$aeq(a, b)).toBe(result);
      },
    );

    test.each(eqCases)("eqCases %p $ne %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$ne(a, b)).toBe(!result);
    });

    const dteqCases: [LokiObj, LokiObj, boolean][] = [
      [0, false, false],
      ["", false, false],
      ["", 0, false],
      [0, "", false],
      ["0", 0, true],
      ["17", 17, true],
      [[1, 2], "1,2", true],
      [String("foo"), "foo", true],
      [{ name: "Loki" }, { name: "Loki" }, true],
      [{ name: "Loki" }, { name: "Thor" }, true],
    ];

    test.each(eqCases)("eqCases %p $dteq %p, returns %p", (a, b, result) => {
      expect(LokiOps.$dteq(a, b)).toBe(result);
    });

    test.each(eqNullAbleCases)(
      "eqNullAbleCases %p $dteq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$dteq(a, b)).toBe(result);
      },
    );

    test.each(aeqNullAbleCases)(
      "aeqNullAbleCases %p $dteq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$dteq(a, b)).toBe(result);
      },
    );

    test.each(dteqCases)(
      "dteqCases %p $dteq %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$dteq(a, b)).toBe(result);
      },
    );

    const gtCases: [LokiObj, LokiObj, boolean][] = [
      [0, 1, false],
      [1, 0, true],
      [Infinity, -0, true],
      [0, -Infinity, true],
      [-Infinity, 0, false],
      [-0, Infinity, false],
      [Infinity, -Infinity, true],
      [-Infinity, Infinity, false],
      [new Date(1, 0), new Date(0, 0), true],
      [new Date(0, 0), new Date(1, 0), false],
      [true, false, true],
      [false, true, false],
    ];

    const gteCases: [LokiObj, LokiObj, boolean][] = [
      [0, 0, true],
      [Infinity, Infinity, true],
      [new Date(0, 0), new Date(0, 0), true],
      ["Loki", "Loki", true],
      [true, true, true],
      [false, false, true],
      ["", "", true],
    ];

    const gtUnmatchedTypeCases: [LokiObj, LokiObj, boolean][] = [
      [1, "Loki", false],
      ["Loki", 1, true],
    ];

    const gteObjectCases: [LokiObj, LokiObj, boolean][] = [
      [{ name: "Loki" }, { name: "Loki" }, true],
    ];

    test.each(gtCases)("gtCases %p $gt %p, returns %p", (a, b, result) => {
      expect(LokiOps.$gt(a, b)).toBe(result);
    });

    test.each(gteCases)("gteCases %p $gt %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$gt(a, b)).toBe(!result);
    });

    test.each(gtUnmatchedTypeCases)(
      "gtUnmatchedTypeCases %p $gt %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$gt(a, b)).toBe(result);
      },
    );

    const gtValueOfNaNCases: [LokiObj, LokiObj, boolean][] = [
      [
        { valueOf: () => NaN },
        { valueOf: () => NaN, toString: () => "" },
        true,
      ],
      [
        { valueOf: () => NaN, toString: () => "" },
        { valueOf: () => NaN },
        false,
      ],
    ];

    test.each(gtValueOfNaNCases)(
      "gtValueOfNaNCases %p $gte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$gte(a, b)).toBe(result);
      },
    );

    test.each(gtCases)("gtCases %p $gte %p, returns %p", (a, b, result) => {
      expect(LokiOps.$gte(a, b)).toBe(result);
    });

    test.each(gteCases)("gteCases %p $gte %p, returns %p", (a, b, result) => {
      expect(LokiOps.$gte(a, b)).toBe(result);
    });

    test.each(eqNullAbleCases)(
      "eqNullAbleCases %p $gte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$gte(a, b)).toBe(result);
      },
    );

    test.each(gtUnmatchedTypeCases)(
      "gtUnmatchedTypeCases %p $gte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$gte(a, b)).toBe(result);
      },
    );

    test.each(gteObjectCases)(
      "gteObjectCases %p $gte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$gte(a, b)).toBe(result);
      },
    );

    test.each(gtCases)("gtCases %p $lt %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$lt(a, b)).toBe(!result);
    });

    test.each(gteCases)("gteCases %p $lt %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$lt(a, b)).toBe(!result);
    });

    test.each(gtUnmatchedTypeCases)(
      "gtUnmatchedTypeCases %p $lt %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$lt(a, b)).toBe(!result);
      },
    );

    test.each(gtValueOfNaNCases)(
      "gtValueOfNaNCases %p $gte %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$lte(a, b)).toBe(!result);
      },
    );

    test.each(gtCases)("gtCases %p $lte %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$lte(a, b)).toBe(!result);
    });

    test.each(gteCases)("gteCases %p $lte %p, returns %p", (a, b, result) => {
      expect(LokiOps.$lte(a, b)).toBe(result);
    });

    test.each(gtUnmatchedTypeCases)(
      "gtUnmatchedTypeCases %p $lte %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$lte(a, b)).toBe(!result);
      },
    );

    test.each(eqNullAbleCases)(
      "eqNullAbleCases %p $gte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$lte(a, b)).toBe(result);
      },
    );

    test.each(gteObjectCases)(
      "gteObjectCases %p $lte %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$lte(a, b)).toBe(result);
      },
    );

    test.each(gtCases)("gtCases %p $jgt %p, returns %p", (a, b, result) => {
      expect(LokiOps.$jgt(a, b)).toBe(result);
    });

    test.each(gtCases)("gtCases %p $jgte %p, returns %p", (a, b, result) => {
      expect(LokiOps.$jgte(a, b)).toBe(result);
    });

    test.each(gtCases)("gtCases %p $jlt %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$jlt(a, b)).toBe(!result);
    });

    test.each(gtCases)("gtCases %p $jlte %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$jlte(a, b)).toBe(!result);
    });

    const betweenCases: [LokiObjNullAble, [LokiObj, LokiObj], boolean][] = [
      [0, [-1, 1], true],
      [null, [-1, 1], false],
      [undefined, [-1, 1], false],
    ];

    test.each(betweenCases)(
      "betweenCases %p $between %p, returns %p",
      (a, values, result) => {
        expect(LokiOps.$between(a, values)).toBe(result);
      },
    );

    test.each(betweenCases)(
      "betweenCases %p $jbetween %p, returns %p",
      (a, values, result) => {
        expect(LokiOps.$jbetween(a, values)).toBe(result);
      },
    );

    const inCases: [LokiObj, LokiObj[], boolean][] = [
      [0, [-1, 0, 1], true],
      [0, [-1, 1], false],
    ];

    test.each(inCases)("inCases %p $in %p, returns %p", (a, b, result) => {
      expect(LokiOps.$in(a, b)).toBe(result);
    });

    test.each(inCases)("inCases %p $nin %p, returns !%p", (a, b, result) => {
      expect(LokiOps.$nin(a, b)).toBe(!result);
    });

    const inSetCases: [LokiObj, Set<LokiObj>, boolean][] = [
      [0, new Set([-1, 0, 1]), true],
      [0, new Set([-1, 1]), false],
    ];

    test.each(inSetCases)(
      "inSetCases %p $inSet %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$inSet(a, b)).toBe(result);
      },
    );

    const keyinCases: [LokiObjKeyAble, object, boolean][] = [
      [0, [0, 1, 2], true],
      [2, [0, 1], false],
      ["key", { key: 0 }, true],
      ["key", {}, false],
    ];

    test.each(keyinCases)(
      "keyinCases %p $keyin %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$keyin(a, b)).toBe(result);
      },
    );

    test.each(keyinCases)(
      "keyinCases %p $nkeyin %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$nkeyin(a, b)).toBe(!result);
      },
    );

    const definedinCases: [
      LokiObjKeyAble,
      Record<LokiObjKeyAble, LokiObj>,
      boolean,
    ][] = [
      [0, { 0: 0 }, true],
      [0, {}, false],
    ];

    test.each(definedinCases)(
      "definedinCases %p $definedin %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$definedin(a, b)).toBe(result);
      },
    );

    test.each(definedinCases)(
      "definedinCases %p $undefinedin %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$undefinedin(a, b)).toBe(!result);
      },
    );

    const regexCases: [string, RegExp, boolean][] = [
      ["0", /0/, true],
      ["", /0/, false],
    ];

    test.each(regexCases)(
      "regexCases %p $regex %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$regex(a, b)).toBe(result);
      },
    );

    const containsStringCases: [string, string, boolean][] = [
      ["0", "0", true],
      ["", "0", false],
    ];

    test.each(containsStringCases)(
      "containsStringCases %p $containsString %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$containsString(a, b)).toBe(result);
      },
    );

    const containsCases: [LokiObjNullAble, LokiObjNullAble, boolean][] = [
      ["0", ["0"], true],
      [["0"], ["0"], true],
      ["0", {}, false],
      [{}, {}, false],
      [0, [], false],
      [0, {}, false],
    ];

    test.each(containsCases)(
      "containsCases %p $containsAny %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$containsAny(a, b)).toBe(result);
      },
    );

    test.each(containsCases)(
      "containsCases %p $containsNone %p, returns !%p",
      (a, b, result) => {
        expect(LokiOps.$containsNone(a, b)).toBe(!result);
      },
    );

    test.each(containsCases)(
      "containsCases %p $contains %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$contains(a, b)).toBe(result);
      },
    );

    const containsAllCases: [LokiObjNullAble, LokiObjNullAble, boolean][] = [
      [["0", "1"], ["0", "1"], true],
      [["0", "1", "2"], ["0", "3"], false],
    ];

    const containsAnyCases: [LokiObjNullAble, LokiObjNullAble, boolean][] = [
      [["0", "1"], ["1"], true],
      [["0", "1", "2"], ["0", "3"], true],
    ];

    test.each(containsAllCases)(
      "containsAllCases %p $contains %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$contains(a, b)).toBe(result);
      },
    );

    test.each(containsAnyCases)(
      "containsAnyCases %p $containsAny %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$containsAny(a, b)).toBe(result);
      },
    );

    const elemMatchCases: [
      Record<string, LokiObj>[] | LokiObj,
      Record<string, Record<string, LokiObj> | LokiObj>,
      boolean,
    ][] = [
      [[{ a: 1, b: 1 }], { a: { $$eq: "b" } }, true],
      [[{ a: 1, b: 2 }], { a: { $$eq: "b" } }, false],
      [
        [{ a: { name: "Loki" }, b: { name: "Loki" } }],
        { a: { $$eq: "b" } },
        false,
      ],
      [{ a: 1, b: 1 }, { a: 1 }, false],
      [[{ a: 1, b: 1 }], { a: 1 }, true],
      [[{ a: { c: 1 }, b: 1 }], { "a.c": { $eq: 1 } }, true],
    ];

    test.each(elemMatchCases)(
      "containsAllCases %p $elemMatch %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$elemMatch(a, b)).toBe(result);
      },
    );

    const typeCases: [LokiObjNullAble, LokiObj, LokiObjNullAble, boolean][] = [
      [1, "number", undefined, true],
      ["Loki", "string", undefined, true],
      [[1], "array", undefined, true],
      [new Date(), "date", undefined, true],
      [1, { $$eq: "b" }, { b: "number" }, true],
      [null, "string", undefined, false],
      [null, "number", undefined, false],
    ];

    test.each(typeCases)(
      "typeCases %p $type %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$type(a, b, record)).toBe(result);
      },
    );

    const finiteCases: [LokiObjNullAble, boolean, boolean][] = [
      [1, true, true],
      ["1", true, true],
      ["Loki", true, false],
      [null, true, true],
      [undefined, true, false],
      [Infinity, true, false],
      [-Infinity, true, false],
      [NaN, true, false],
    ];

    test.each(finiteCases)(
      "finiteCases %p $finite %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$finite(a, b)).toBe(result);
      },
    );

    const sizeCases: [LokiObj, LokiObj, LokiObjNullAble, boolean][] = [
      [[1], 1, undefined, true],
      [[1], { $$gt: "size" }, { size: 0 }, true],
      [[1], { $$lt: "size" }, { size: 2 }, true],
      [1, 1, undefined, false],
    ];

    test.each(sizeCases)(
      "sizeCases %p $size %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$size(a, b, record)).toBe(result);
      },
    );

    const lenCases: [LokiObj, LokiObj, LokiObjNullAble, boolean][] = [
      ["1", 1, undefined, true],
      ["1", { $$gt: "size" }, { size: 0 }, true],
      ["1", { $$lt: "size" }, { size: 2 }, true],
      [1, 1, undefined, false],
    ];

    test.each(lenCases)(
      "lenCases %p $len %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$len(a, b, record)).toBe(result);
      },
    );

    const whereCases: [LokiObj, (obj: LokiObj) => boolean, boolean][] = [
      ["1", (obj: LokiObj): boolean => typeof obj === "string", true],
      [1, (obj: LokiObj): boolean => typeof obj === "number", true],
      [1, (obj: LokiObj): boolean => typeof obj === "string", false],
      ["1", (obj: LokiObj): boolean => typeof obj === "number", false],
    ];

    test.each(whereCases)(
      "whereCases %p $where %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$where(a, b)).toBe(result);
      },
    );

    const notCases: [LokiObj, LokiObj, LokiObjNullAble, boolean][] = [
      [0, { $eq: 1 }, undefined, true],
      ["0", { $eq: "1" }, undefined, true],
    ];

    test.each(notCases)(
      "notCases %p $not %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$not(a, b, record)).toBe(result);
      },
    );

    const andCases: [LokiObj, LokiObj[], LokiObjNullAble, boolean][] = [
      [1, [{ $eq: 1 }, { $type: "number" }], undefined, true],
      ["1", [{ $eq: "1" }, { $type: "string" }], undefined, true],
      ["1", [{ $eq: "0" }, { $type: "string" }], undefined, false],
      ["1", [{ $eq: "1" }, { $type: "number" }], undefined, false],
    ];

    test.each(andCases)(
      "andCases %p $and %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$and(a, b, record)).toBe(result);
      },
    );

    const orCases: [LokiObj, LokiObj[], LokiObjNullAble, boolean][] = [
      [1, [{ $eq: 0 }, { $type: "number" }], undefined, true],
      ["1", [{ $eq: "0" }, { $type: "string" }], undefined, true],
      ["1", [{ $eq: "0" }, { $type: "number" }], undefined, false],
    ];

    test.each(orCases)(
      "orCases %p $or %p record %p, returns %p",
      (a, b, record, result) => {
        expect(LokiOps.$or(a, b, record)).toBe(result);
      },
    );

    const existsCases: [LokiObjNullAble, boolean, boolean][] = [
      [1, true, true],
      ["1", true, true],
      ["Loki", true, true],
      [null, true, true],
      [undefined, true, false],
      [Infinity, true, true],
      [-Infinity, true, true],
      [NaN, true, true],
      [undefined, false, true],
    ];

    test.each(existsCases)(
      "existsCases %p $exists %p, returns %p",
      (a, b, result) => {
        expect(LokiOps.$exists(a, b)).toBe(result);
      },
    );
  });

  describe("$$", () => {
    const eqCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [1, "a", { a: 1 }, true],
      ["Loki", "a", { a: "Loki" }, true],
    ];
    test.each(eqCases)(
      "eqCases %p $$eq spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$eq(a, spec, record)).toBe(result);
      },
    );

    test.each(eqCases)(
      "eqCases %p $$aeq spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$aeq(a, spec, record)).toBe(result);
      },
    );

    test.each(eqCases)(
      "eqCases %p $$ne spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$ne(a, spec, record)).toBe(!result);
      },
    );

    test.each(eqCases)(
      "eqCases %p $$dteq spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$dteq(a, spec, record)).toBe(result);
      },
    );

    const gtCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [2, "a", { a: 1 }, true],
      ["Thor", "a", { a: "Loki" }, true],
    ];
    test.each(gtCases)(
      "gtCases %p $$gt spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$gt(a, spec, record)).toBe(result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$gte spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$gte(a, spec, record)).toBe(result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$lt spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$lt(a, spec, record)).toBe(!result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$lte spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$lte(a, spec, record)).toBe(!result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$jgt spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$jgt(a, spec, record)).toBe(result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$jgte spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$jgte(a, spec, record)).toBe(result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$jlt spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$jlt(a, spec, record)).toBe(!result);
      },
    );

    test.each(gtCases)(
      "gtCases %p $$jlte spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$jlte(a, spec, record)).toBe(!result);
      },
    );

    const betweenCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [0, "vals", { vals: [-1, 1] }, true],
      [null, "vals", { vals: [1, -1] }, false],
    ];

    test.each(betweenCases)(
      "betweenCases %p $$between spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$between(a, spec, record)).toBe(result);
      },
    );

    test.each(betweenCases)(
      "betweenCases %p $$jbetween spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$jbetween(a, spec, record)).toBe(result);
      },
    );

    const inCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["Loki", "a", { a: ["Loki"] }, true],
      [0, "a", { a: [-1, 0, 1] }, true],
      [0, "a", { a: [-1, 1] }, false],
    ];

    test.each(inCases)(
      "inCases %p $$in spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$in(a, spec, record)).toBe(result);
      },
    );

    test.each(inCases)(
      "inCases %p $$nin spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$nin(a, spec, record)).toBe(!result);
      },
    );

    const inSetCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["Loki", "a", { a: new Set(["Loki"]) }, true],
      [0, "a", { a: new Set([-1, 0, 1]) }, true],
      [0, "a", { a: new Set([-1, 1]) }, false],
    ];

    test.each(inSetCases)(
      "inSetCases %p $$inSet spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$inSet(a, spec, record)).toBe(result);
      },
    );

    const keyinCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["name", "a", { a: { name: "Loki" } }, true],
      [0, "a", { a: {} }, false],
    ];

    test.each(keyinCases)(
      "keyinCases %p $$keyin spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$keyin(a, spec, record)).toBe(result);
      },
    );

    test.each(keyinCases)(
      "keyinCases %p $$nkeyin spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$nkeyin(a, spec, record)).toBe(!result);
      },
    );

    const definedinCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["name", "a", { a: { name: "Loki" } }, true],
      [0, "a", { a: {} }, false],
    ];

    test.each(definedinCases)(
      "definedinCases %p $$definedin spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$definedin(a, spec, record)).toBe(result);
      },
    );

    test.each(definedinCases)(
      "definedinCases %p $$undefinedin spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$undefinedin(a, spec, record)).toBe(!result);
      },
    );

    const regexCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["0", "a", { a: /0/ }, true],
      ["", "a", { a: /0/ }, false],
    ];

    test.each(regexCases)(
      "regexCases %p $$regex spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$regex(a, spec, record)).toBe(result);
      },
    );

    const containsStringCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["0", "a", { a: "0" }, true],
      ["", "a", { a: "0" }, false],
    ];

    test.each(containsStringCases)(
      "containsStringCases %p $$containsString spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$containsString(a, spec, record)).toBe(result);
      },
    );

    const containsCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["0", "a", { a: "0" }, true],
      [["0"], "a", { a: "0" }, true],
      [{}, "a", { a: {} }, false],
      [0, "a", { a: {} }, false],
      [0, "a", { a: [] }, false],
    ];

    test.each(containsCases)(
      "containsStringCases %p $$containsAny spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$containsAny(a, spec, record)).toBe(result);
      },
    );

    test.each(containsCases)(
      "containsStringCases %p $$containsNone spec %p record %p, returns !%p",
      (a, spec, record, result) => {
        expect(LokiOps.$$containsNone(a, spec, record)).toBe(!result);
      },
    );

    test.each(containsCases)(
      "containsStringCases %p $$contains spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$contains(a, spec, record)).toBe(result);
      },
    );

    const elemMatchCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [[{ a: 1, b: 1 }], "a", { a: { a: { $$eq: "b" } } }, true],
      [[{ a: 1, b: 2 }], "a", { a: { a: { $$eq: "b" } } }, false],
      [[{ a: { c: 1 }, b: 1 }], "a", { a: { "a.c": { $$eq: "b" } } }, true],
    ];

    test.each(elemMatchCases)(
      "elemMatchCases %p $$elemMatch spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$elemMatch(a, spec, record)).toBe(result);
      },
    );

    const typeCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [[1, "a", { a: "number" }, true]];

    test.each(typeCases)(
      "typeCases %p $$type spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$type(a, spec, record)).toBe(result);
      },
    );

    const finiteCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [1, "a", { a: true }, true],
      ["1", "a", { a: true }, true],
      [null, "a", { a: true }, true],
      [undefined, "a", { a: true }, false],
      [Infinity, "a", { a: true }, false],
      [-Infinity, "a", { a: true }, false],
      [NaN, "a", { a: true }, false],
    ];

    test.each(finiteCases)(
      "finiteCases %p $$finite spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$finite(a, spec, record)).toBe(result);
      },
    );

    const sizeCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [[1], "a", { a: 1 }, true],
      [[1], "a", { a: { $gt: 0 } }, true],
      [[1], "a", { a: { $lt: 2 } }, true],
      [1, "a", { a: 1 }, false],
    ];

    test.each(sizeCases)(
      "sizeCases %p $$size spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$size(a, spec, record)).toBe(result);
      },
    );

    const lenCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      ["1", "a", { a: 1 }, true],
      ["1", "a", { a: { $gt: 0 } }, true],
      ["1", "a", { a: { $lt: 2 } }, true],
      [1, "a", { a: 1 }, false],
    ];

    test.each(lenCases)(
      "lenCases %p $$len spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$len(a, spec, record)).toBe(result);
      },
    );

    const whereCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [
        "1",
        "a",
        { a: (obj: LokiObj): boolean => typeof obj === "string" },
        true,
      ],
      [1, "a", { a: (obj: LokiObj): boolean => typeof obj === "number" }, true],
      [
        1,
        "a",
        { a: (obj: LokiObj): boolean => typeof obj === "string" },
        false,
      ],
      [
        "1",
        "a",
        { a: (obj: LokiObj): boolean => typeof obj === "number" },
        false,
      ],
    ];

    test.each(whereCases)(
      "whereCases %p $$where spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$where(a, spec, record)).toBe(result);
      },
    );

    const notCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [0, "a", { a: { $eq: 1 } }, true],
      ["0", "a", { a: { $eq: "1" } }, true],
    ];

    test.each(notCases)(
      "notCases %p $$not spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$not(a, spec, record)).toBe(result);
      },
    );

    const andCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [1, "a", { a: [{ $eq: 1 }, { $type: "number" }] }, true],
      [1, "a", { a: [{ $eq: 1 }, { $type: "string" }] }, false],
      ["1", "a", { a: [{ $eq: "1" }, { $type: "string" }] }, true],
      ["1", "a", { a: [{ $eq: "1" }, { $type: "number" }] }, false],
    ];

    test.each(andCases)(
      "andCases %p $$and spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$and(a, spec, record)).toBe(result);
      },
    );

    const orCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [1, "a", { a: [{ $eq: 0 }, { $type: "number" }] }, true],
      [1, "a", { a: [{ $eq: 0 }, { $type: "string" }] }, false],
      ["1", "a", { a: [{ $eq: "0" }, { $type: "number" }] }, false],
    ];

    test.each(orCases)(
      "orCases %p $$or spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$or(a, spec, record)).toBe(result);
      },
    );

    const existsCases: [
      LokiObjNullAble,
      string | ((record: object) => LokiObjNullAble),
      LokiObjNullAble,
      boolean,
    ][] = [
      [1, "a", { a: true }, true],
      ["1", "a", { a: true }, true],
      ["Loki", "a", { a: true }, true],
      [null, "a", { a: true }, true],
      [undefined, "a", { a: true }, false],
      [Infinity, "a", { a: true }, true],
      [-Infinity, "a", { a: true }, true],
      [NaN, "a", { a: true }, true],
      [undefined, "a", { a: false }, true],
    ];

    test.each(existsCases)(
      "existsCases %p $$exists spec %p record %p, returns %p",
      (a, spec, record, result) => {
        expect(LokiOps.$$exists(a, spec, record)).toBe(result);
      },
    );
  });
});
