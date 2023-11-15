import {
  CloneMethod,
  LokiDoc,
  LokiDocObj,
  LokiObj,
  LokiObjNullAble,
  NullAble,
} from "@/type";
import { LokiOps } from "@/LokiOps";

export class Helper {
  public static containsCheckFn(
    a: LokiObjNullAble,
  ): ((str: string) => boolean) | null {
    if (typeof a === "string" || Array.isArray(a)) {
      return function (b: string): boolean {
        return a.indexOf(b) !== -1;
      };
    } else if (typeof a === "object" && a !== null) {
      return function (b: string): boolean {
        return Object.prototype.hasOwnProperty.call(a, b);
      };
    }
    return null;
  }

  public static valueLevelOp(
    op: string,
    a: LokiObjNullAble,
    spec: string | ((record: object) => LokiObjNullAble),
    record: LokiObjNullAble,
  ): boolean {
    if (typeof spec === "string") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return LokiOps[op](a, record[spec]);
    } else if (typeof spec === "function") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return LokiOps[op](a, spec(record));
    } else {
      throw new Error("Invalid argument to $$ matcher");
    }
  }

  public static dotSubScan(
    root: LokiObj | Record<string, LokiObj>,
    paths: Array<string>,
    fun: (
      element: LokiObj,
      value: Record<string, LokiObj> | LokiObj,
      extra: LokiObj,
    ) => boolean,
    value: Record<string, LokiObj> | LokiObj,
    extra: LokiObj | Record<string, LokiObj>,
    pOffSet: number = 0,
  ): boolean {
    const pathOffset = pOffSet;
    const path = paths[pathOffset];

    let valueFound = false;
    let element: LokiObj | LokiObj[];
    if (root !== null && typeof root === "object" && path in root) {
      element = (root as Record<string, LokiObj>)[path];
    }
    if (pathOffset + 1 >= paths.length) {
      valueFound = fun(element!, value, extra);
    } else if (Array.isArray(element!)) {
      for (let index = 0, len = element.length; index < len; index += 1) {
        valueFound = this.dotSubScan(
          element[index],
          paths,
          fun,
          value,
          extra,
          pathOffset + 1,
        );
        if (valueFound) {
          break;
        }
      }
    } else {
      valueFound = this.dotSubScan(
        element!,
        paths,
        fun,
        value,
        extra,
        pathOffset + 1,
      );
    }

    return valueFound;
  }

  public static doQueryOp(
    val: LokiObj,
    op: Record<string, LokiObj> | LokiObj,
    record: LokiObjNullAble,
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const p in op) {
      if (p in LokiOps) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return LokiOps[p](val, op[p], record);
      }
    }
    return false;
  }

  public static clone(
    data: NullAble<LokiDoc>,
    method: CloneMethod,
  ): NullAble<LokiDoc> {
    if (data === null || data === undefined) {
      return null;
    }

    const cloneMethod = method || "parse-stringify";
    let cloned: LokiDoc = {};
    switch (cloneMethod) {
      case "parse-stringify":
        cloned = JSON.parse(JSON.stringify(data));
        break;
      case "shallow":
        // more compatible method for older browsers
        cloned = Object.create(data.constructor.prototype);
        Object.keys(data).map(function (i) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cloned[i] = data[i];
        });
        break;
      case "shallow-assign":
        // should be supported by newer environments/browsers
        cloned = Object.create(data.constructor.prototype);
        Object.assign(cloned, data);
        break;
    }

    return cloned;
  }

  public static cloneObjectArray(
    objarray: LokiDoc,
    method: CloneMethod,
  ): LokiDoc {
    if (method == "parse-stringify") {
      return this.clone(objarray, method)!;
    }
    const result = [];
    if (Array.isArray(objarray)) {
      for (let i = 0, len = objarray.length; i < len; i++) {
        result[i] = this.clone(objarray[i], method)!;
      }
    }
    return result;
  }

  public static freeze<T>(obj: T): void {
    if (!Object.isFrozen(obj)) {
      Object.freeze(obj);
    }
  }

  public static deepFreeze<T>(obj: T): void {
    let prop: string;
    let i: number;
    if (Array.isArray(obj)) {
      for (i = 0; i < obj.length; i++) {
        this.deepFreeze(obj[i]);
      }
      this.freeze(obj);
    } else if (obj !== null && typeof obj === "object") {
      for (prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.deepFreeze(obj[prop] as LokiDocObj);
        }
      }
      this.freeze(obj);
    }
  }

  public static unFreeze<T>(obj: T): T {
    if (!Object.isFrozen(obj)) {
      return obj;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.clone(obj, "shallow")!;
  }
}
