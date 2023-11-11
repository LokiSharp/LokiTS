export type LokiObj = string | number | RegExp | boolean | object;
export type LokiObjNullAble = LokiObj | undefined | null;
export type LokiObjKeyAble = Exclude<LokiObj, boolean | object>;

export interface LokiOps {
  [key: string]: (a: LokiObj, b: LokiObj) => boolean;
}

export type LokiOpsFunction = (
  a: LokiObjNullAble,
  spec: string | ((record: object) => LokiObjNullAble),
  record: LokiObjNullAble,
) => boolean;

export type EventListener = (...args: unknown[]) => void;
