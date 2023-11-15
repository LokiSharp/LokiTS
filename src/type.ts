export type LokiDoc = LokiDocObj | LokiDocArray;
export type LokiDocObj = Record<string, LokiObj> & {
  $loki?: number;
  meta?: object;
};
export type LokiDocArray = LokiDoc[];
export type LokiObj = string | number | RegExp | boolean | object;
export type LokiObjNullAble = NullAble<LokiObj>;
export type LokiObjKeyAble = Exclude<LokiObj, boolean | object>;
export type NullAble<T> = T | undefined | null;
export interface LokiOps {
  [key: string]: (a: LokiObj, b: LokiObj) => boolean;
}

export type LokiOpsFunction = (
  a: LokiObjNullAble,
  spec: string | ((record: object) => LokiObjNullAble),
  record: LokiObjNullAble,
) => boolean;

export type EventListener = (...args: unknown[]) => void;

export type Options = {
  clone?: boolean;
  cloneMethod?: CloneMethod;
  disableFreeze?: boolean;
  disableMeta?: boolean;
};

export type CloneMethod = "parse-stringify" | "shallow" | "shallow-assign";
