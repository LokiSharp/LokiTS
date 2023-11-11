import { Comparators } from "./Comparators";
import { LokiObj, LokiObjKeyAble, LokiObjNullAble } from "./type";
import { Helper } from "@/Helper";

export class LokiOps {
  public static $eq(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return a === b;
  }

  public static $aeq(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return a == b;
  }

  public static $ne(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return a !== b;
  }

  public static $dteq(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return Comparators.aeq(a, b);
  }

  public static $gt(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return Comparators.gt(a, b, false);
  }

  public static $gte(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return Comparators.gt(a, b, true);
  }

  public static $lt(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return Comparators.lt(a, b, false);
  }

  public static $lte(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return Comparators.lt(a, b, true);
  }

  public static $jgt(a: LokiObj, b: LokiObj): boolean {
    return a > b;
  }

  public static $jgte(a: LokiObj, b: LokiObj): boolean {
    return a >= b;
  }

  public static $jlt(a: LokiObj, b: LokiObj): boolean {
    return a < b;
  }

  public static $jlte(a: LokiObj, b: LokiObj): boolean {
    return a <= b;
  }

  public static $between(
    a: LokiObjNullAble,
    values: [LokiObj, LokiObj],
  ): boolean {
    if (a === undefined || a === null) return false;
    return (
      Comparators.gt(a, values[0], true) && Comparators.lt(a, values[1], true)
    );
  }

  public static $jbetween(
    a: LokiObjNullAble,
    values: [LokiObj, LokiObj],
  ): boolean {
    if (a === undefined || a === null) return false;
    return a >= values[0] && a <= values[1];
  }

  public static $in(a: LokiObj, b: LokiObj[]): boolean {
    return b.indexOf(a) !== -1;
  }

  public static $nin(a: LokiObj, b: LokiObj[]): boolean {
    return b.indexOf(a) === -1;
  }

  public static $inSet(a: LokiObj, b: Set<LokiObj>): boolean {
    return b.has(a);
  }

  public static $keyin(a: LokiObjKeyAble, b: object): boolean {
    return a in b;
  }

  public static $nkeyin(a: LokiObjKeyAble, b: object): boolean {
    return !(a in b);
  }

  public static $definedin(
    a: LokiObjKeyAble,
    b: Record<LokiObjKeyAble, LokiObj>,
  ): boolean {
    return b[a] !== undefined;
  }

  public static $undefinedin(
    a: LokiObjKeyAble,
    b: Record<LokiObjKeyAble, LokiObj>,
  ): boolean {
    return b[a] === undefined;
  }

  public static $regex(a: string, b: RegExp): boolean {
    return b.test(a);
  }

  public static $containsString(a: string, b: string): boolean {
    return a.includes(b);
  }

  public static $containsAny(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    const checkFn = Helper.containsCheckFn(a);
    if (checkFn !== null) {
      return Array.isArray(b) ? b.some(checkFn) : checkFn(<string>b);
    }
    return false;
  }

  public static $containsNone(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    return !this.$containsAny(a, b);
  }

  public static $contains(a: LokiObjNullAble, b: LokiObjNullAble): boolean {
    const checkFn = Helper.containsCheckFn(a);
    if (checkFn !== null) {
      return Array.isArray(b) ? b.every(checkFn) : checkFn(<string>b);
    }
    return false;
  }

  public static $elemMatch(
    a: Record<string, LokiObj>[] | LokiObj,
    b: Record<string, Record<string, LokiObj> | LokiObj>,
  ): boolean {
    if (Array.isArray(a)) {
      return a.some(function (item: Record<string, LokiObj>) {
        return Object.keys(b).every(function (property: string): boolean {
          let filter: Record<string, LokiObj> | LokiObj = b[property];
          if (!(typeof filter === "object" && filter)) {
            filter = { $eq: filter };
          }

          if (property.indexOf(".") !== -1) {
            return Helper.dotSubScan(
              item,
              property.split("."),
              Helper.doQueryOp,
              b[property],
              item,
            );
          }
          return Helper.doQueryOp(item[property], filter, item);
        });
      });
    }
    return false;
  }

  public static $type(
    a: LokiObjNullAble,
    b: LokiObj,
    record: LokiObjNullAble,
  ): boolean {
    let type: string = typeof a;
    if (type === "object") {
      if (Array.isArray(a)) {
        type = "array";
      } else if (a instanceof Date) {
        type = "date";
      }
    }

    return typeof b !== "object"
      ? type === b
      : Helper.doQueryOp(type, b, record);
  }

  public static $finite(a: LokiObjNullAble, b: boolean): boolean {
    return b === isFinite(<number>a);
  }

  public static $size(
    a: LokiObj,
    b: LokiObj,
    record: LokiObjNullAble,
  ): boolean {
    if (Array.isArray(a)) {
      return typeof b !== "object"
        ? a.length === b
        : Helper.doQueryOp(a.length, b, record);
    }
    return false;
  }

  public static $len(a: LokiObj, b: LokiObj, record: LokiObjNullAble): boolean {
    if (typeof a === "string") {
      return typeof b !== "object"
        ? a.length === b
        : Helper.doQueryOp(a.length, b, record);
    }
    return false;
  }

  public static $where(a: LokiObj, b: (obj: LokiObj) => boolean): boolean {
    return b(a);
  }

  public static $not(a: LokiObj, b: LokiObj, record: LokiObjNullAble): boolean {
    return !Helper.doQueryOp(a, b, record);
  }

  public static $and(
    a: LokiObj,
    b: LokiObj[],
    record: LokiObjNullAble,
  ): boolean {
    for (let idx = 0, len = b.length; idx < len; idx += 1) {
      if (!Helper.doQueryOp(a, b[idx], record)) {
        return false;
      }
    }
    return true;
  }

  public static $or(
    a: LokiObj,
    b: LokiObj[],
    record: LokiObjNullAble,
  ): boolean {
    for (let idx = 0, len = b.length; idx < len; idx += 1) {
      if (Helper.doQueryOp(a, b[idx], record)) {
        return true;
      }
    }
    return false;
  }

  public static $exists(a: LokiObjNullAble, b: boolean): boolean {
    if (b) {
      return a !== undefined;
    } else {
      return a === undefined;
    }
  }

  public static $$eq(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$eq", a, spec, record);
  }

  public static $$aeq(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$aeq", a, spec, record);
  }

  public static $$ne(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$ne", a, spec, record);
  }

  public static $$dteq(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$dteq", a, spec, record);
  }

  public static $$gt(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$gt", a, spec, record);
  }

  public static $$gte(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$gte", a, spec, record);
  }

  public static $$lt(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$lt", a, spec, record);
  }

  public static $$lte(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$lte", a, spec, record);
  }

  public static $$jgt(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$gt", a, spec, record);
  }

  public static $$jgte(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$gte", a, spec, record);
  }

  public static $$jlt(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$lt", a, spec, record);
  }

  public static $$jlte(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$jlte", a, spec, record);
  }

  public static $$between(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$between", a, spec, record);
  }

  public static $$jbetween(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$jbetween", a, spec, record);
  }

  public static $$in(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$in", a, spec, record);
  }

  public static $$inSet(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$inSet", a, spec, record);
  }

  public static $$nin(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$nin", a, spec, record);
  }

  public static $$keyin(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$keyin", a, spec, record);
  }

  public static $$nkeyin(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$nkeyin", a, spec, record);
  }

  public static $$definedin(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$definedin", a, spec, record);
  }

  public static $$undefinedin(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$undefinedin", a, spec, record);
  }

  public static $$regex(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$regex", a, spec, record);
  }

  public static $$containsString(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$containsString", a, spec, record);
  }

  public static $$containsNone(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$containsNone", a, spec, record);
  }

  public static $$containsAny(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$containsAny", a, spec, record);
  }

  public static $$contains(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$contains", a, spec, record);
  }

  public static $$elemMatch(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$elemMatch", a, spec, record);
  }

  public static $$type(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$type", a, spec, record);
  }

  public static $$finite(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$finite", a, spec, record);
  }

  public static $$size(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$size", a, spec, record);
  }

  public static $$len(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$len", a, spec, record);
  }

  public static $$where(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$where", a, spec, record);
  }

  public static $$not(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$not", a, spec, record);
  }

  public static $$and(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$and", a, spec, record);
  }

  public static $$or(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$or", a, spec, record);
  }

  public static $$exists(
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    return Helper.valueLevelOp("$exists", a, spec, record);
  }
}
