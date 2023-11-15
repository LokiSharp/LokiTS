import { LokiEventEmitter } from "./LokiEventEmitter";

export class Loki extends LokiEventEmitter {
  public filename: string;
  public options: Record<string, unknown>;
  public constructor(filename: string, options?: Record<string, unknown>) {
    super();
    this.filename = filename;
    this.options = options || {};
    this.events = {
      init: [],
      loaded: [],
      flushChanges: [],
      close: [],
      changes: [],
      warning: [],
    };
  }
}
