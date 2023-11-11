import { LokiObjNullAble } from "@/type";

export class Comparators {
  public static aeq(prop1: LokiObjNullAble, prop2: LokiObjNullAble): boolean {
    if (prop1 === prop2) return true;
    let cv1: number | string, cv2: number | string, t1: number, t2: number;
    if (
      !prop1 ||
      !prop2 ||
      prop1 === true ||
      prop2 === true ||
      prop1 !== prop1 ||
      prop2 !== prop2
    ) {
      switch (prop1) {
        case undefined:
          t1 = 1;
          break;
        case null:
          t1 = 1;
          break;
        case false:
          t1 = 3;
          break;
        case true:
          t1 = 4;
          break;
        case "":
          t1 = 5;
          break;
        default:
          t1 = prop1 === prop1 ? 9 : 0;
          break;
      }

      switch (prop2) {
        case undefined:
          t2 = 1;
          break;
        case null:
          t2 = 1;
          break;
        case false:
          t2 = 3;
          break;
        case true:
          t2 = 4;
          break;
        case "":
          t2 = 5;
          break;
        default:
          t2 = prop2 === prop2 ? 9 : 0;
          break;
      }

      if (t1 !== 9 || t2 !== 9) {
        return t1 === t2;
      }
    }

    cv1 = Number(prop1);
    cv2 = Number(prop2);

    if (cv1 === cv1 || cv2 === cv2) {
      return cv1 === cv2;
    }

    cv1 = prop1!.toString();
    cv2 = prop2!.toString();

    return cv1 == cv2;
  }

  public static gt(
    prop1: LokiObjNullAble,
    prop2: LokiObjNullAble,
    equal: boolean,
  ): boolean {
    let cv1: number | string, cv2: number | string, t1: number, t2: number;
    if (
      !prop1 ||
      !prop2 ||
      prop1 === true ||
      prop2 === true ||
      prop1 !== prop1 ||
      prop2 !== prop2
    ) {
      switch (prop1) {
        case undefined:
          t1 = 1;
          break;
        case null:
          t1 = 1;
          break;
        case false:
          t1 = 3;
          break;
        case true:
          t1 = 4;
          break;
        case "":
          t1 = 5;
          break;
        default:
          t1 = prop1 === prop1 ? 9 : 0;
          break;
      }

      switch (prop2) {
        case undefined:
          t2 = 1;
          break;
        case null:
          t2 = 1;
          break;
        case false:
          t2 = 3;
          break;
        case true:
          t2 = 4;
          break;
        case "":
          t2 = 5;
          break;
        default:
          t2 = prop2 === prop2 ? 9 : 0;
          break;
      }

      if (t1 !== 9 || t2 !== 9) {
        return t1 === t2 ? equal : t1 > t2;
      }
    }

    cv1 = Number(prop1);
    cv2 = Number(prop2);

    if (cv1 === cv1 && cv2 === cv2) {
      if (cv1 > cv2) return true;
      if (cv1 < cv2) return false;
      return equal;
    }

    if (cv1 === cv1 && cv2 !== cv2) {
      return false;
    }

    if (cv2 === cv2 && cv1 !== cv1) {
      return true;
    }

    if (prop1! > prop2!) return true;
    if (prop1! < prop2!) return false;
    if (prop1 == prop2) return equal;

    cv1 = prop1!.toString();
    cv2 = prop2!.toString();

    if (cv1 > cv2) {
      return true;
    }

    if (cv1 == cv2) {
      return equal;
    }

    return false;
  }

  public static lt(
    prop1: LokiObjNullAble,
    prop2: LokiObjNullAble,
    equal: boolean,
  ): boolean {
    let cv1: number | string, cv2: number | string, t1: number, t2: number;
    if (
      !prop1 ||
      !prop2 ||
      prop1 === true ||
      prop2 === true ||
      prop1 !== prop1 ||
      prop2 !== prop2
    ) {
      switch (prop1) {
        case undefined:
          t1 = 1;
          break;
        case null:
          t1 = 1;
          break;
        case false:
          t1 = 3;
          break;
        case true:
          t1 = 4;
          break;
        case "":
          t1 = 5;
          break;
        default:
          t1 = prop1 === prop1 ? 9 : 0;
          break;
      }

      switch (prop2) {
        case undefined:
          t2 = 1;
          break;
        case null:
          t2 = 1;
          break;
        case false:
          t2 = 3;
          break;
        case true:
          t2 = 4;
          break;
        case "":
          t2 = 5;
          break;
        default:
          t2 = prop2 === prop2 ? 9 : 0;
          break;
      }

      if (t1 !== 9 || t2 !== 9) {
        return t1 === t2 ? equal : t1 < t2;
      }
    }

    cv1 = Number(prop1);
    cv2 = Number(prop2);

    if (cv1 === cv1 && cv2 === cv2) {
      if (cv1 < cv2) return true;
      if (cv1 > cv2) return false;
      return equal;
    }

    if (cv1 === cv1 && cv2 !== cv2) {
      return true;
    }

    if (cv2 === cv2 && cv1 !== cv1) {
      return false;
    }

    if (prop1! < prop2!) return true;
    if (prop1! > prop2!) return false;
    if (prop1 == prop2) return equal;

    cv1 = prop1!.toString();
    cv2 = prop2!.toString();

    if (cv1 < cv2) {
      return true;
    }

    if (cv1 == cv2) {
      return equal;
    }

    return false;
  }
}
