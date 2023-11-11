import { LokiObj, LokiObjNullAble } from "@/type";
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
}
